let express = require("express");
let router = express.Router();
let deptModel = require("../models/departments");

const awaitHandler = fn => {
  return async (req, res, next) => {
    try {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      await fn(req, res, next);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
};

router.get(
  "/deptNamesAndSeats",
  awaitHandler(async (req, res) => {
    let response = await deptModel.find({DeptYear: req.query.deptYear}).select({"DeptName": 1, "DeptSeats":1});
    console.log(response);
    res.send(response);
  })
);

router.post(
  "/addDept",
  awaitHandler(async (req, res) => {
    let newDept = new deptModel({
      DeptName: req.body.deptName,
      DeptSeats: req.body.deptSeats,
      DeptYear: req.body.deptYear
    })
    newDept.save((err, dept)=>{
      if(err){
        throw err;
      }
      console.log("dept added");
      res.send(dept);
    })
  })
);

router.delete(
  "/deleteDept",
  awaitHandler(async (req, res) => {
    let response = await deptModel.findOneAndDelete({DeptName: req.body.deptName, DeptYear: req.body.deptYear})
    if(response){
    res.send(response)
    }else{
      res.send({"err":"no such department to delete"})
    }
  })
);

router.put(
  "/changeSeats",
  awaitHandler(async (req, res) => {
    let response = await deptModel.findOneAndUpdate({DeptName: req.body.deptName, DeptYear: req.body.deptYear},{DeptSeats: req.body.deptSeats, allocated:0}, {new: true})
    if(response){
    res.send(response)
    }else{
      res.send({"err":"no such department to update"})
    }
  })
);


module.exports = router;
