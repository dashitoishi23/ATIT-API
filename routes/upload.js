let express = require("express");
let fileUpload = require("express-fileupload")
let router = express.Router();
const fs = require('fs')
router.use(fileUpload())

router.post('/upload',(req,res)=>{
    if(req.files===null){
        return res.status(400).json("No file")
    }
    const file = req.files.file
    console.log("Inside uplaod")
    console.log(file)
    if(!fs.existsSync('./assets/Results.xlsx')){
        file.mv(`./assets/Results.xlsx`,err=>{
            if(err){
                console.log(err)
                res.status(500).send(err)
            }
            res.send("File uploaded")
        })
    }
    else{
        fs.unlinkSync('./assets/Results.xlsx')
        file.mv(`./assets/Results.xlsx`,err=>{
            if(err){
                console.log(err)
                res.status(500).send(err)
            }
            res.send("File uploaded")
        })
    }

})
router.post('/uploadTerm',(req,res)=>{
    if(req.files===null){
        return res.status(400).json("No file")
    }
    const file = req.files.file
    console.log("Inside uplaod")
    if(!fs.existsSync('./assets/Term.xlsx')){
        file.mv(`./assets/Term.xlsx`,err=>{
            if(err){
                console.log(err)
                res.status(500).send(err)
            }
            res.send('Success')
        })
    }
    else{
        fs.unlinkSync('./assets/Term.xlsx')
        file.mv(`./assets/Term.xlsx`,err=>{
            if(err){
                console.log(err)
                res.status(500).send(err)
            }
            res.send("File uploaded")
        })
    }

})

module.exports = router