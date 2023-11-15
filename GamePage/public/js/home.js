function clearClicked(){
  $("#index").val("0")
  $("#name").val("")
  $("#comments").val("0")
  $("#uploader").val("")
  return false;
}

let action = "Create";
function setAction(actionParam) {
  console.log("setAction = " + actionParam);
  action = actionParam;
}

function uploadSuccess(data) {
  console.log("uploadSuccess===== " + action);
  if (action == "Create")
  {

    $.ajax({
      url: "/create",
      type: "POST",
      data: {index:Number($("#index").val()), name:$("#name").val(), comments:$("#comments").val(),image:data.name},
      success: function(data){
        if (!data)
          alert("ERROR");
        else
          alert("CREATE VALID = " + data.image);
      } ,     
      dataType: "json"
    });
  }
 
  
}







$(document).ready(function(){ 


  $("#clearButton").click(clearClicked);

  $("form").submit(function(event) {
    console.log("form submit");
    let data = new FormData($(this)[0]);

    $.ajax({
      url: "/fileupload",
      type: "POST",
      data: data,
      processData: false, // These two are needed to prevent JQuery from processing the form data
      contentType: false,
      mimeType: 'multipart/form-data',
      dataType: 'json', // Without this, the server's response will be a string instead of a JSON object
      success: uploadSuccess,     
      dataType: "json"
    });

    return false;
  });
  

});

