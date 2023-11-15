let messageNum = 0;


function readClicked(){ //insert thge name data in a value here
  console.log($("#index").val());
  $.ajax({
    url: "/read",
    type: "GET",
    data: {index:Number($("#index").val())},
    success: function(data){
      if (data){ 
              if(data.index != messageNum){
              messageNum = data.index;
              console.log(data);
     //   display.src = "images/" + data.msg.image;
        $("#list").append('<li>' + data.msg.name + " : " + data.msg.comment + '</li>');

        if(data.msg.image != ''){ //this adds the image with each post
        console.log("images/" + data.msg.image);
        $("#list").append('<li>' + ('<img src="'+ ("images/" + data.msg.image) +'" height="285" width="380">') + '</li>');
        }

       }
      }
    },
    dataType: "json"
  });  
  return false;
  }




      let socket = io();
      getLeaderBoard();

       //$("#count").text(localStorage.getItem("fred"));
      $("#name").text(localStorage.getItem("user"));
      $("#count").text("Points: " + (localStorage.getItem("money")));

      socket.on('leaderboard', function(data) {
        //console.log(data);
        $("#leaderboard").find("tr:gt(0)").remove();
        //console.log(data.length)
        for(let i=0;i<data.length;i++){

          $("#leaderboard").append("<tr><td>" + (+i + +1) +"</td><td>" + data[i].name + "</td><td>" + data[i].money + "</tr>");
        }  
                 
      });

      function getLeaderBoard(){
      //console.log("huh")
   
        socket.emit('leaderboard');
          let numMilliSeconds = 2000;   // 1000 milliseconds = 1 second
          setTimeout(getLeaderBoard, numMilliSeconds);
        }


polling();

function polling() {
    // your code goes here
    //console.log("ace of spades");
    readClicked();

    let numMilliSeconds = 1000;   // 1000 milliseconds = 1 second
    setTimeout(polling, numMilliSeconds);
}



      $(document).ready(function(){ 

     

      });

   