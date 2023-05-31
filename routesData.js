var express = require("express");
var passport = require("passport");
var path = require("path");


var User = require("./models/user");
var router = express.Router();

const myDatabase = require('./myDatabase');
let db = new myDatabase();

const Info = require('./Info');
var otherInfo = require("./models/Info");


router.use(function(req, res, next) {
  res.locals.currentUserjy = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});


let identA = 0;

function initIdent(){
 
      console.log("call initIdent");
      otherInfo.find({},function(err,user) {
        if (err) {
          console.log(err);
          reject(err);
        }
        else {
          let objs = [];
          for (let i=0;i<user.length;i++) {
            if (Number(identA) < Number(user[i].ident))
              identA = user[i].ident;
          }
          console.log("inside init: " + identA)
                   
        }
      });
 
}
initIdent();



function rollDice(){

    return(Math.floor(Math.random() * 6) + 1 +
            Math.floor(Math.random() * 6) + 1+
            Math.floor(Math.random() * 6) + 1);
}



//new create code from signup.
router.post('/create', function(req, res){
    if (!req.isAuthenticated()) {
        console.log("req is not Authenticated");
        res.json({error:true});
        return;
    }
        
    let rand = [rollDice(), rollDice(), rollDice(), rollDice(), rollDice(), rollDice()];
    console.log(rand);

    let temp;
    let tempNum;
console.log("=========Put all in order========");
    const possibleStats = rand;
    const statsInOrder = []
    for(let i=0; i<6; i++){
        temp=possibleStats[0]
        tempNum=0;
        for(let j=possibleStats.length; j>0; j--){
            if(possibleStats[j]>=temp){
                temp= possibleStats[j];
                tempNum=j;
            }
        }
        statsInOrder[i]=temp
        possibleStats[tempNum]=0;
    }

    for(let i=0; i<statsInOrder.length; i++){
        let temp = statsInOrder[i];
        temp -=10;
        if (temp % 2 != 0){
            temp--;
        }
        temp = temp/2;
        
        statsInOrder[i] = temp;
        console.log(statsInOrder[i]);
    }
   

  if(req.body.playerClass=="Wizard"){
        wisdom = statsInOrder[1];
        dexterity = statsInOrder[2];
        intelligence = statsInOrder[0];
        charisma = statsInOrder[3];
        strength = statsInOrder[4];
   }
   else if(req.body.playerClass=="Druid"){
        wisdom = statsInOrder[0];
        dexterity = statsInOrder[1];
        intelligence = statsInOrder[2];
        charisma = statsInOrder[4];
        strength = statsInOrder[3];
   }
   else if(req.body.playerClass=="Fighter"){
        wisdom = statsInOrder[2];
        dexterity = statsInOrder[4];
        intelligence = statsInOrder[1];
        charisma = statsInOrder[3];
        strength = statsInOrder[0];
   }
   else if(req.body.playerClass=="Rouge"){
        wisdom = statsInOrder[2];
        dexterity = statsInOrder[0];
        intelligence = statsInOrder[1];
        charisma = statsInOrder[3];
        strength = statsInOrder[4];
   }
   else if(req.body.playerClass=="Bard"){
        wisdom = statsInOrder[3];
        dexterity = statsInOrder[1];
        intelligence = statsInOrder[2];
        charisma = statsInOrder[0];
        strength = statsInOrder[4];
   }




console.log(req.user.username+ " | "+req.body.characterName+ " | "+req.body.playerRace+ " | "+req.body.playerClass);

    
      
      identA++;
console.log("identA = " + identA);
        let obj = new Info(identA,req.user.username,req.body.characterName,req.body.playerRace,req.body.playerClass,strength,dexterity,intelligence,wisdom,charisma);
    
    
////change code       
        db.postData(obj,res);
      
          
   
    
    

//    let name = req.body.name.trim();
//    if (name == "") {
//        res.json({error:true});
//        return;
//    }
    
    //console.log("identA = " + identA);
    //////let obj = new Info(identA,req.user.username,req.body.characterName,req.body.canDrive);
    //identA++;
    
////change code       
    /////db.postData(obj,res);
////    return(db.postData(obj,res));
///*
//    let val = db.postData(obj);
//    if (val)
//        res.json({error:false});
//    else
//        res.json({error:true});
//*/

    console.log("post create routesData.js");
//    res.json({error:true});
});

router.get('/read', function(req, res){
    if (!req.isAuthenticated()) {
        console.log("req is not Authenticated");
        res.json({error:true});
        return;
    }

//changed code.
console.log("here"+req.query.characterName);
console.log(req.user.username);
    db.getData(req.query.characterName,res);
/*
    let val = db.getData(identifier);
    if (val == null)
        res.json({error:true});
    else
        res.json({error:false,name:val.name});
*/

});



router.delete('/delete/:identifier', function(req, res){

    if (!req.isAuthenticated()) {
        console.log("req is not Authenticated");
        res.json({error:true});
        return;
    }

//changed code.
//    return( db.deleteData(identifier,res));
    return( db.deleteData(req.user.username,res));
/*
    let val = db.deleteData(identifier);
    if (val == null)
        res.json({error:true});
    else
        res.json({error:false});
*/
});



router.get('/readAdmin', function(req, res){
    if (!req.isAuthenticated()) {
        console.log("req is not Authenticated");
        res.json({error:true});
        return;
    }

//changed code.
console.log(req.query.username);
    return(db.getData(req.query.username,res));
/*
    let val = db.getData(identifier);
    if (val == null)
        res.json({error:true});
    else
        res.json({error:false,name:val.name});
*/

});


    






module.exports = router;

