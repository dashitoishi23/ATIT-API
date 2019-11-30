let readXlsxFile = require("read-excel-file/node");
let express = require("express");
let router = express.Router();

let list = require("../models/merList");
let atitModel = require("../models/atit");
let departModel = require("../models/departments");

router.post('/slidingup', async (req,res) => {
  let response = await atitModel
  .find({ eligible: true })
  .sort([["totalScore", -1], ["maths", -1], ["physics", -1]]);
  let fileD = await readXlsxFile('./assets/Term.xlsx')
  let depts = await departModel.find({DeptYear: 2018})
  let de = depts
  for(let i=1;i<fileD.length;i++){
    let ind = response.findIndex(obj=>{
      return fileD[i][1] === 0 && obj.id == fileD[i][0]
    })
    if(ind!=-1){
      let dep = depts.findIndex(obj=>{
        return obj.DeptName === response[ind].allocated
      })
      if(dep!==-1){
        --depts[dep].allocated
        response.splice(ind,1)
      }
    }
  }
  console.log(depts)
  for (let i = 0; i < response.length; i++) {
    if(response[i].allocated !==response[i].preference){
      let department = depts.findIndex(obj => {
        return obj.DeptName === response[i].preference;
      });
      if (
        department === -1 ||
        depts[department].allocated === depts[department].DeptSeats
      ) {
        let department2 = depts.findIndex(obj => {
          return obj.DeptName === response[i].preference2;
        });
        if (
          department2 === -1 ||
          depts[department2].allocated === depts[department2].DeptSeats
        ) {
          let department3 = depts.findIndex(obj => {
            return obj.DeptName === response[i].preference3;
          });
          if (
            department3 === -1 ||
            depts[department3].allocated === depts[department3].DeptSeats
          ) {
            let temp = { ...response[i]._doc };
            response[i] = { ...temp, allocated: "None" };
          } else {
            if(response[i].allocated !== "None"){
              let d = depts.findIndex(obj=>{
                return obj.DeptName === response[i].allocated
              })
              if(d!==-1){
                --depts[d].allocated
                response[i].allocated = depts[department3].DeptName;
                ++depts[department3].allocated;
              }
            }else{
              response[i].allocated = depts[department3].DeptName;
              ++depts[department3].allocated;
            }
          }
        } else {
          if(response[i].allocated !== "None"){
            let d = depts.findIndex(obj=>{
              return obj.DeptName === response[i].allocated
            })
            if(d!==-1){
              --depts[d].allocated
              response[i].allocated = depts[department2].DeptName;
              ++depts[department2].allocated;
            }
          }else{
            response[i].allocated = depts[department2].DeptName;
            ++depts[department2].allocated;
          }
        }
      } else {
          response[i].allocated = depts[department].DeptName;
          ++depts[department].allocated;
        }
    }
 
  }
  res.json({
    response: response,
    seats: depts
  })
  await departModel.collection.drop();
  await departModel.insertMany(depts);
  let dep = await departModel.find({DeptYear: 2018})
  console.log(dep)

})

router.post("/atitScoresAndUser", async (req, res) => {
  try {
    // userModel.collection.drop();
    atitModel.collection.drop();
    let atitScores = [];
    console.log("starting reading file");
    let fileData = await readXlsxFile("./assets/Results.xlsx");
    console.log("Done reading file");
    let atitTemp = {};
    for (let i = 1; i < fileData.length; i++) {
      atitTemp = {};
      atitTemp = {
        id: fileData[i][0],
        name: fileData[i][1],
        maths: fileData[i][2],
        physics: fileData[i][3],
        english: fileData[i][4],
        logical: fileData[i][5],
        totalScore: fileData[i][6],
        email: fileData[i][7],
        preference: fileData[i][8],
        preference2: fileData[i][9],
        preference3: fileData[i][10]
      };
      atitScores.push(atitTemp);
    }
    console.log("started inserting into database");
    // let response1 = await userModel.create(userData);
    let response2 = await atitModel.insertMany(atitScores);
    console.log("done adding into database");
    console.time("done filtering");
    let response = await atitModel
      .find({ eligible: true })
      .sort([["totalScore", -1], ["maths", -1], ["physics", -1]]);
    console.timeEnd("done filtering");
    // let depts = [{
    //     DeptName: "CSE",
    //     DeptSeats: 5,
    //     allocated: 0,
    // }]
    let depts = await departModel.find({ DeptYear: req.body.deptYear });
    for (let i = 0; i < depts.length; i++) {
      depts[i].allocated = 0;
    }
    console.time("allocation");
    for (let i = 0; i < response.length; i++) {
      let department = depts.findIndex(obj => {
        return obj.DeptName === response[i].preference;
      });
      if (
        department === -1 ||
        depts[department].allocated === depts[department].DeptSeats
      ) {
        let department2 = depts.findIndex(obj => {
          return obj.DeptName === response[i].preference2;
        });
        if (
          department2 === -1 ||
          depts[department2].allocated === depts[department2].DeptSeats
        ) {
          let department3 = depts.findIndex(obj => {
            return obj.DeptName === response[i].preference3;
          });
          if (
            department3 === -1 ||
            depts[department3].allocated === depts[department3].DeptSeats
          ) {
            let temp = { ...response[i]._doc };
            response[i] = { ...temp, allocated: "None" };
          } else {
            response[i].allocated = depts[department3].DeptName;
            ++depts[department3].allocated;
          }
        } else {
            response[i].allocated = depts[department2].DeptName;          
          ++depts[department2].allocated;
        }
      } else {
        response[i].allocated = depts[department].DeptName;
        ++depts[department].allocated;
      }
    }
    console.timeEnd("allocation");
    await atitModel.collection.drop();
    await departModel.collection.drop();
    await departModel.insertMany(depts);
    await atitModel.insertMany(response);
    res.send(response);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/getAllocations", (req, res) => {
  try {
    atitModel
      .find({ eligible: true })
      .sort([["totalScore", -1], ["maths", -1], ["physics", -1]])
      .then(scores=>{
        console.log(scores)
        res.json(scores)
      });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/prepMerit", (req, res) => {
  let merList = [];
  readXlsxFile("./assets/ATIT Students Results.xlsx")
    .then(rows => {
      for (let i = 1; i < 2394; i++) {
        merList.push({
          maths: rows[i][14],
          physics: rows[i][17],
          logical: rows[i][20],
          english: rows[i][23],
          totalScore: rows[i][17],
          name: rows[i][5],
          preference: rows[i][39],
          pref2: rows[i][40],
          pref3: rows[i][41]
        });
      }
      let mer = new list({
        meritList: merList
      });
      mer
        .save()
        .then(li => {
          console.log(li);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});
module.exports = router;
