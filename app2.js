$(document).ready(function(){
  var name = getUserName();

  while(name == ""){
    $("#errorMessage").text("Name is not valid");
    var name = getUserName();
  }

  $("#errorMessage").text("");
  $("#gamePlayMessage").text("Welcome " + name + " to an awesome game!");

  function getUserName(){
    return prompt("what's your name?");
  }
})