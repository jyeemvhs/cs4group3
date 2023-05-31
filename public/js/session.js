
 		
function readClicked(){
  console.log("These Nuts");
  console.log($("#characterName").val());
          $.ajax({
            url: "/read",
            type: "GET",
            data: {characterName:$("#characterName").val()},
            success: function(data){
                if (data.error)
                  alert("bad");
                else {
                  console.log(data.ident + " " + data.characterName);
                  $("#identifier").val(data.ident);
                  $("#characterName").val(data.characterName);

                  $("#strength").text("Strength: " + data.strength);
                  $("#dexterity").text("Dexterity: " + data.dexterity);
                  $("#intelligence").text("Intelligence: " + data.intelligence);
                  $("#wisdom").text("Wisdom: " + data.wisdom);
                  $("#charisma").text("Charisma: " + data.charisma);
                  
                }
              } ,     
            dataType: "json"
          });   
  return false;
}

/*
function deleteClicked(){

    let trimIdentifier = $("#identifier").val().trim();
    if (trimIdentifier == "") {
      alert("bad");
      return false; 
    }

    $.ajax({
      url: "/delete/" + $("#identifier").val(),
      type: "DELETE",
      success: function(data) { 
        if (data.error)
          alert("bad");
        else
          alert("good");
      } ,   
      dataType: "json"
    });  
    return false;             
}      
*/

function createClicked(ident){

          $.ajax({
            url: "/create",
            type: "POST",
            data: {
            
            characterName:$("#characterName").val(),
            playerRace:$("#race option:selected").text(),
            playerClass:$("#class option:selected").text()

            },
            success: function(data){
              if (!data)
                alert("bad create"); 
              
              else{
                readClicked();
                alert("good create");
              }
              } ,     
            dataType: "json"
          });  
        return false;
      }



function logoutClicked(){
console.log("session logoutClicked")
  $.get("/logout",function(data){
console.log("session logout function callback");    
    window.location = data.redirect;
  });
  return false;             
}

$(document).ready(function(){ 
console.log("session doc ready")
	


  $("#readButton").click(readClicked);
  $("#createButton").click(createClicked);
//  $("#deleteButton").click(deleteClicked);

	$("#logout").click(logoutClicked);

});  		
    


