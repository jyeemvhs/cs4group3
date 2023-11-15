
let express = require('express');
let bodyParser = require('body-parser');
let routes = require("./routes");
//let coinFlip = require("./coinFlip")

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
app.use(express.static('public'));
//app.use(coinFlip);
let http = require('http');


var infoList = [];


var index = 0;

/**
 * Create HTTP server.
 */
let server = http.createServer(app);
////////////////////////////////
// Socket.io server listens to our app
let io = require('socket.io').listen(server);

// Emit welcome message on connection
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });

    socket.on('create', function (data) {
        // Broadcast to everyone (including self)
        //io.emit('update', {name:data.name,comment:data.comment});
        infoList[index] = {name:data.name,money:data.money}
        socket.emit('create', {infoid: index});
        //console.log(infoList)
    
        index++;

    });
 	 socket.on('update', function (data) {
        // Broadcast to everyone (including self)
        //io.emit('update', {name:data.name,comment:data.comment});
        infoList[data.id] = {name:data.name,money:data.money}
        //console.log(infoList[data.id]);
        
    });

 	socket.on('leaderboard', function (){
        //console.log(infoList)
		var tempList = [];
        for(let i=0;i<infoList.length;i++){
            tempList.push(infoList[i]);
        }

		tempList.sort(function(a, b) {
		  return  b.money - a.money ;
		});
		//console.log("huh")

		socket.emit('leaderboard',tempList);

		
	});

 		
 	
});

/**
 * Listen on provided port, on all network interfaces.
 */
let port = process.env.PORT || 3003;

server.listen(port);
