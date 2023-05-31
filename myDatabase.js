var express = require("express");
var mongoose = require("mongoose");
var InfoModel = require("./models/Info");
//const Data = require('./Data');
//var routes = require("./routes");

let myDatabase = function() {
}

 

myDatabase.prototype.postData = function(data,res) {
  let obj = {ident:data.ident,name:data.name,characterName:data.characterName,playerRace:data.playerRace,playerClass:data.playerClass,strength:data.strength,dexterity:data.dexterity,intelligence:data.intelligence,wisdom:data.wisdom,charisma:data.charisma};
  InfoModel.create(obj,function(error,info) {
      if (error) {
          return res.json({error:true});
      }
      return res.json({error:false});
  });
}

myDatabase.prototype.getData = function(characterName,res) {

console.log("getData");
  InfoModel.find({characterName:characterName},function(error,info) {
      if (error) {
          return res.json({error:true});
      }
      else if (info == null) {
          return res.json({error:true});
      }

      if (info.length == 1)    
          return res.json({error:false,ident:info[0].ident,characterName:info[0].characterName,playerRace:info[0].playerRace,playerClass:info[0].playerClass,strength:info[0].strength,dexterity:info[0].dexterity,intelligence:info[0].intelligence,wisdom:info[0].wisdom,charisma:info[0].charisma});
      else
          return res.json({error:true});
   });
}

 

myDatabase.prototype.putData = function(data,res) { 

  InfoModel.findOneAndUpdate({name:data.name},{ident:data.ident,characterName:data.characterName,playerRace:data.playerRace,playerClass:data.playerClass,strength:data.strength,dexterity:data.dexterity,intelligence:data.intelligence,wisdom:data.wisdom,charisma:data.charisma},function(error,oldData) {
    if (error) {
      return res.json({error:true});
    }
    else if (oldData == null) {
      return res.json({error:true});
    }

//    console.log("old identA = " + identA);
//    if (identA < data.ident)
//      identA = data.ident;
//    console.log("new identA = " + identA);

    return res.json({error:false});
  });
}

myDatabase.prototype.deleteData = function(name,res) {
    InfoModel.remove({name:name},function(error,removed) {
        if (error) {
            return res.json({error:true});
        }        
        if (removed.result.n == 0)
            return res.json({error:true});
        return res.json({error:false});
    });
}

module.exports = myDatabase;

 
