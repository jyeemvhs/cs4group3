          var currName = "";
          let ident;

          let socket = io();
//Get message from server.
          socket.on('welcome', function(data) {
              ident = data.id;
              //console.log(ident);
/* !!!!! Kind of like making an account (uncomment later *maybe)
              socket.emit('create', {'name': localStorage.getItem("user") 
                ,'money': localStorage.getItem("money")});
*/
          });

          socket.on('create', function(data) {
            localStorage.setItem("id",data.infoid);
            //console.log(data.infoid)
               
          });
           
          function createClicked(){
            //console.log("bruh")
            currName = $("#comment").val();
            $("#comment").val("");

            localStorage.setItem("user",currName);
            localStorage.setItem("money",1000);

            socket.emit('create', {'name': currName ,'money': 1000});

            return false;
          }


        

          $(document).ready(function(){    
            $("#menuButt").hide();

            $("#comment").keydown( function( event ) {
                if ( event.which === 13 ) {
                  console.log("yeah");
                  createClicked();
                  $("#menuButt").show();
                   
                  event.preventDefault();
                  return false;
                }
            });

          }); 