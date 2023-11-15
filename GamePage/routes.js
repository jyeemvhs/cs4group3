var express = require("express");
var router = express.Router();
//var path = require("path");

router.get("/",function(request,response){
	response.sendFile(__dirname + "/public/view/index.html");

});

router.get("/gamble",function(request,response){
	response.sendFile(__dirname + "/public/view/gamba.html");

});

router.get("/posting",function(request,response){
response.sendFile(__dirname + "/public/view/posting.html");
});

router.get("/coin",function(request,response){
    response.sendFile(__dirname + "/public/coin.html");

});

router.get("/coinStyle",function(request,response){
    response.sendFile(__dirname + "/public/coinStyle.css");

});
router.get("/slotsStyle",function(request,response){
    response.sendFile(__dirname + "/public/view/slotsStyle.css");

});
router.get("/slots",function(request,response){
	response.sendFile(__dirname + "/public/view/slots.html");
});




module.exports = router;