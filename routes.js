let path = require("path");
let express = require("express");
let game = require("./gameLoader");
let campaignM = require("./campaignManager");
let charCreator = require("./characterCreator");
let formidable = require("formidable");
let mv = require("mv"); 
let fs = require("fs");



let currentIdent=0;

//Look at below web page for info on express.Router()
//https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
let router = express.Router();

const myDatabase = require('./myDatabase');
let db = new myDatabase();

const Data = require('./Data');

//request is info sending to server from client.
//response is info sending to client from server.

router.get("/",function(req,res){
    res.sendFile(path.resolve(__dirname + "/public/views/index.html"));  //changed
});

router.get("/tutorial",function(req,res){
    res.sendFile(path.resolve(__dirname + "/public/views/tutorial.html"));  //changed
});

router.get("/game",function(req,res){
    console.log("get game");
  if (req.isAuthenticated()) {
    console.log("sendFile game.html")
    let thePath = path.resolve(__dirname,"public/views/game.html");      
    res.sendFile(thePath);  
  } else {
    console.log("sendFile login.html")
    let thePath = path.resolve(__dirname,"public/views/login.html");        
    res.sendFile(thePath);  
  }
    
});

router.get('/campaignList', function(req, res){
  console.log("campaign list");
  fs.readdir('./gameData', function(err, data) {
    
    console.log("campaignlist" + data);
    res.json(data);
  });
});

router.get('/console', function(req, res){

    game.doStoryState(req.query.name, function(data){
    	res.json(data);
    });

});

router.get('/storyStateUpload', function(req, res){

    console.log(req.query.filename);
    campaignM.createStoryState(req.query.campaign, req.query.filename, req.query.storystate);

    res.json({error: false});
});

router.post('/imgUpload', function(req, res){
    console.log("imgUpload");
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        console.log(files);
        var oldpath = files.file.filepath;
        console.log(oldpath);
        console.log(fields);
        ensureExists(__dirname + '/public/images/userUpload/' + fields.campaign + "/", function(err){
            var newpath = __dirname + '/public/images/userUpload/' + fields.campaign + "/" + fields.filename + "." + files.file.originalFilename.split('.').pop();;
            console.log(newpath);
            console.log('Received image: ' + fields.filename);

            mv(oldpath, newpath, function (err) {
                if (err) {
                    return;

                } 
                    

                res.json({ name: fields.filename });
            });
        });
        
    });
});

function ensureExists(path, mask, cb) { // This should probably be in another file but I don't care Also I have no idea how it works
    if (typeof mask == 'function') { // Allow the `mask` parameter to be optional
        cb = mask;
        mask = 0o744;
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // Ignore the error if the folder already exists
            else cb(err); // Something else went wrong
        } else cb(null); // Successfully created folder
    });
}



router.get('/createCampaign', function(req, res){
    console.log(req.query);
    campaignM.createCampaign(req.query);

    res.json({error: false});
});

router.get("/editor",function(req,res){
    res.sendFile(path.resolve(__dirname + "/public/views/campaignMaker.html"));  //changed
});

var passport = require("passport");
var Promise = require('promise');

var Info = require("./models/Info");
var User = require("./models/user");

//function ensureAuthenticated(req, res, next) {
//  if (req.isAuthenticated()) {
//    next();
//  } else {
//    req.flash("info", "You must be logged in to see this page.");
//    res.redirect("/login");
//  }
//}

router.use(function(req, res, next) {
  res.locals.currentUserjy = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

//added code
//global.identA = 0;
let identA = 0;

function initIdent(){
 
      console.log("call initIdent");
      Info.find({},function(err,user) {
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
                   
        }
      });
 
}
initIdent();

router.get("/getCharacters", function(req, res) {
  if (req.isAuthenticated()) {
    console.log(req.user.username);    
    Info.find({name: req.user.username},function(error,info) {
      if (error) {
        return res.json(null);
      } else {
        let list = [];
        for (let i=0;i<info.length;i++) {
          console.log(info[i].characterName);
          list.push({characterName:info[i].characterName});
        }
        res.json ({characterList:list});
      }
    });
  }
  
});

router.get("/successroot", function(req, res) {
console.log("get successroot");
    res.json({redirect:"/"});   
});

router.get("/failroot", function(req, res) {
console.log("get failroot");
    res.json({redirect:"/login"});  
});


router.get("/successsignup", function(req, res) {
console.log("get successsignup");
    if (req.user.username == "admin")
    {
      res.json({redirect:"/adminsession"});      
    }
    else
    {
      identA++;
      console.log("identA = " + identA);
      res.json({redirect:"/session",ident:identA});    
    }
});



router.get("/failsignup", function(req, res) {
console.log("get failsignup");
    res.json({redirect:"/login"});  
});


router.get("/successlogin", function(req, res) {
console.log("get successlogin");
    if (req.user.username == "admin")
    {
      res.json({redirect:"/adminsession"});      
    }
    else
    {
      res.json({redirect:"/session"});    
    }
  console.log("end of successlogin");
});

router.get("/faillogin", function(req, res) {
console.log("get failsignup");
    res.json({redirect:"/login"});  

});






router.get("/login", function(req, res, next) {
  console.log("get root");
      let thePath = path.resolve(__dirname,"public/views/login.html");    
      res.sendFile(thePath);    
});


router.get("/signup", function(req, res) {
console.log("get signup");
  
      
      let thePath = path.resolve(__dirname,"public/views/signup.html");    
      res.sendFile(thePath);    
    
  
});

router.get("/login", function(req, res) {
console.log("get login");
      let thePath = path.resolve(__dirname,"public/views/login.html");    
      res.sendFile(thePath);    
});


router.get("/session", function(req, res) {
  console.log("get session");
  if (req.isAuthenticated()) {
    console.log("sendFile session.html")
    let thePath = path.resolve(__dirname,"public/views/session.html");      
    res.sendFile(thePath);  
  } else {
    console.log("sendFile login.html")
    let thePath = path.resolve(__dirname,"public/views/login.html");        
    res.sendFile(thePath);  
  }
});

router.get("/adminsession", function(req, res) {
  console.log("get adminsession");
  if (req.isAuthenticated()) {
    console.log("sendFile adminsession.html")
  let thePath = path.resolve(__dirname,"public/views/adminsession.html");    
  res.sendFile(thePath);  
  } else {
    console.log("sendFile login.html")
    let thePath = path.resolve(__dirname,"public/views/login.html");    
  res.sendFile(thePath);  
  }
});


router.get("/adminInfo",function(req,res){
  if (req.isAuthenticated()) {

        if (req.user.username == "admin")
        {
            initAdmin(req,res);
        }
        else
          res.json(null);          
  }
  else {
    res.json(null);
  }
});

//==================
function initAdmin(req,res) {
  console.log("initAdmin");
  console.log(req.user.username);
            Info.find({},function(error,info) {
              if (error) {
                return res.json(null);
              } else {
                let list = [];
                for (let i=0;i<info.length;i++) {
                  console.log(info[i].name);
                  list.push({ident:info[i].ident,name:info[i].name});
                }
                res.json ({ ident:req.user.ident,username: req.user.username,userList:list});
              }
            });

}



router.get("/userInfo",function(req,res){
  console.log("get userInfo");
     if (req.isAuthenticated()) {
  console.log("req isAuthenticated");
  console.log("valueJY = " + req.user.valueJY);    /* user defined value */
            Info.find({name:req.user.username},function(error,info) {
              if (error) {
                return res.json(null);
              } else {
                res.json({username:req.user.username,ident:info[0].ident,characterName:info[0].characterName,playerRace:info[0].playerRace,playerClass:info[0].playerClass,strength:info[0].strength,dexterity:info[0].dexterity,intelligence:info[0].intelligence,wisdom:info[0].wisdom,charisma:info[0].charisma});
             }
            });
    }
    else {
  console.log("req is not Authenticated");
        res.json(null);
    }
});




router.get("/logout", function(req, res) {
  console.log("get logout")
  if (req.isAuthenticated()) {
  console.log("req isAuthenticated");
    req.logout();
    res.redirect("/successroot");
  } else {
  console.log("req is not Authenticated");
    res.redirect("/failroot");
  }
});

router.post("/signup", function(req, res, next) {
console.log("post signup");

  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(err, user) {
console.log("User findOne function callback")
    if (err) 
    {
      console.log("err"); 
      return next(err); 
    }
    if (user) {
      console.log("user")
      req.flash("error", "User already exists");
      return res.redirect("/failsignup");
    }
console.log("new User")
    var newUser = new User({
      username: username,
      password: password
    });
    newUser.save(next);    //goes to user.js (userSchema.pre(save))
  });


}, passport.authenticate("login", {       //goes to setuppassport.js  (passport.use("login"))
  successRedirect: "/successsignup",
  failureRedirect: "/failsignup",
  failureFlash: true
}));




router.post("/login", passport.authenticate("login", {
  successRedirect: "/successlogin",
  failureRedirect: "/faillogin",
  failureFlash: true
}));


module.exports = router;