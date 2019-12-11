const express=require('express');
const User=require('../models/user');
const router=express.Router();
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const keys = require('../config/keys');
const validatorUserRegister=require('../validation/userRegister');
const validatorUserLogin=require('../validation/userLogin');


router.post('/register',(req,res)=>{
    const {errors,isValid}=validatorUserRegister(req.body);
    if(!isValid){
        return res.status(404).json(errors);
    }
    User.findOne({username:req.body.username})
    .then(user=>{
        if(user){
            return res.status(404).json({err:"User already exists"});
        }
        else{
            
                   const newUser=new User({
                       username: req.body.username,
                       password:req.body.password,
                   });
                   bcrypt.genSalt(10, (err, salt)=> {
                    bcrypt.hash(req.body.password, salt,(err, hash)=> {
                        if(err) throw err;
                        newUser.password=hash;
                        newUser.save()
                        .then(user=>{
                            console.log(user)
                        })
                        .catch(err=>console.log(err));
                    });
                }); 
        }
    })
});
router.post('/login',(req,res)=>{
    const {errors,isValid}=validatorUserLogin(req.body);
    if(!isValid){
        return res.status(404).json(errors);
    }
    User.findOne({username:req.body.username})
    .then(user=>{
        
        if(user){
            bcrypt.compare(req.body.password,user.password)
            .then(isMatch=>{
                if(!isMatch){
                    return res.status(404).json({err:"invalid password"})
                }
                else{
                    const payload={id:user.id,username:user.username};
                    jwt.sign(payload,keys.secret,{expiresIn:60*60*3},
                        (err,token)=>{
                            res.json({
                                success:true,
                                userName: payload.username,
                                token:'bearer '+token
                            })
                    })
                    // return res.json({ok:"username"}) 
                }
            })
        }
        else{
            return res.status(404).json({err:"invalid username"})
        }
    })
})
module.exports=router;