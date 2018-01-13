$(document).ready(function(){
  var powered = false;
  var playerTurn = false;
  var melody = [];
  var playerMelody = [];
  var lightDuration = 1100; //millisecs
  var strict = false;

/*

0 : green
1 : red
2 : yellow
3 : blue
*/



  $("#powerbtn").on("click",function(){

    switch(powered){
      case true:
      powered = false;
      $("#powerled").attr('class', 'led-off');
      $("#strictled").attr('class', 'led-off');
      $("#green").attr('class', 'green-off');
      $("#red").attr('class', 'red-off');
      $("#yellow").attr('class', 'yellow-off');
      $("#blue").attr('class', 'blue-off');
      $("#display").html("");
      break;

      case false:
      poweringUp();
      break;
    }


  })

  $("#resetbtn").on("click",function() {
    if(!powered){return;}
    poweringUp();

  })

  $("#strictbtn").on("click",function() {
    if(!powered){return;}
    switch(strict){
      case true:
      $("#strictled").attr('class', 'led-off');
      poweringUp();
      strict = false;
      break;
      case false:
      $("#strictled").attr('class', 'led-on');
      poweringUp();
      strict = true;
      break;
    }


  })


  $("#green").on("click",function(){
    if(!powered){return;}
    if(!playerTurn){return;}
    $("#green").attr('class', 'green-on');
    document.getElementById("audio-green").play();
    setTimeout(function() {
      $("#green").attr('class', 'green-off');
    }, lightDuration);
    playerMelody.push("green");
    checkResult();

  }) // fin green

  $("#red").on("click",function(){
    if(!powered){return;}
    if(!playerTurn){return;}
    $("#red").attr('class', 'red-on');
    document.getElementById("audio-red").play();
    setTimeout(function() {
      $("#red").attr('class', 'red-off');
    }, lightDuration);
    playerMelody.push("red");
    checkResult();

  }) // fin red

  $("#yellow").on("click",function(){
    if(!powered){return;}
    if(!playerTurn){return;}
    $("#yellow").attr('class', 'yellow-on');
    document.getElementById("audio-yellow").play();
    setTimeout(function() {
      $("#yellow").attr('class', 'yellow-off');
    }, lightDuration);
    playerMelody.push("yellow");
    checkResult();

  }) // fin yellow


  $("#blue").on("click",function(){
    if(!powered){return;}
    if(!playerTurn){return;}
    $("#blue").attr('class', 'blue-on');
    document.getElementById("audio-blue").play();
    setTimeout(function() {
      $("#blue").attr('class', 'blue-off');
    }, lightDuration);
    playerMelody.push("blue");
    checkResult();

  }) // fin red



  function poweringUp(){
    powered = true;
    melody = [];
    playerTurn = false;
    $("#powerled").attr('class', 'led-on');
    $("#display").html("00");

    $("#green").attr('class', 'green-on');
    $("#red").attr('class', 'red-on');
    $("#yellow").attr('class', 'yellow-on');
    $("#blue").attr('class', 'blue-on');
    setTimeout(function() {
      $("#green").attr('class', 'green-off');
      $("#red").attr('class', 'red-off');
      $("#yellow").attr('class', 'yellow-off');
      $("#blue").attr('class', 'blue-off');
      setTimeout(function(){
        upgradeMelody();
      }, 500);

    }, lightDuration);


  } //fin poweringUp

  function upgradeMelody(){
    playerTurn = false;
    playerMelody = [];
    var rand = getRandomInt(0, 4);

    switch(rand){
      case 0:
      melody.push("green");
      break;
      case 1:
      melody.push("red");
      break;
      case 2:
      melody.push("yellow");
      break;
      case 3:
      melody.push("blue");
      break;
    }
    console.log("current melody:" + melody);
    playMelody();
  }


  function playMelody(){
    playerTurn = false;
    playerMelody = [];

    if(melody.length<10){
      $("#display").html("0"+melody.length);

    }else{$("#display").html(melody.length);}






    for(i=0; i<melody.length; i++){


      switch(melody[i]){
        case "green":
        setTimeout(function(){
          $("#green").attr('class', 'green-on');
          document.getElementById("audio-green").play();
          setTimeout(function() {
            $("#green").attr('class', 'green-off');
          }, lightDuration*0.8);
        },(i+1)*lightDuration);
        break;
        case "red":
        setTimeout(function(){
        $("#red").attr('class', 'red-on');
        document.getElementById("audio-red").play();
        setTimeout(function() {
          $("#red").attr('class', 'red-off');
        }, lightDuration*0.8);
        },(i+1)*lightDuration);
        break;
        case "yellow":
        setTimeout(function(){
        $("#yellow").attr('class', 'yellow-on');
        document.getElementById("audio-yellow").play();
        setTimeout(function() {
          $("#yellow").attr('class', 'yellow-off');
        }, lightDuration*0.8);
        },(i+1)*lightDuration);
        break;
        case "blue":
        setTimeout(function(){
        $("#blue").attr('class', 'blue-on');
        document.getElementById("audio-blue").play();
        setTimeout(function() {
          $("#blue").attr('class', 'blue-off');
        }, lightDuration*0.8);
        },(i+1)*lightDuration);
        break;
      }



    }

    setTimeout(function(){
      playerTurn = true;
    },(melody.length+1)*lightDuration);


  }


  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
     //The maximum is exclusive and the minimum is inclusive
  }


  function checkResult(){
    console.log("playerMelody: " + playerMelody);
    if(JSON.stringify(playerMelody)==JSON.stringify(melody)){
      console.log("melodies match !");
      if(melody.length == 20){
        victory();
      }else{
        setTimeout(function(){
          upgradeMelody();

        }, 500);
      }
    }

    for(i=0; i<playerMelody.length; i++){
      if(playerMelody[i] !== melody[i]){
        console.log("wrong");
        $("#display").html("XX");
        $("#green").attr('class', 'green-on');
        $("#red").attr('class', 'red-on');
        $("#yellow").attr('class', 'yellow-on');
        $("#blue").attr('class', 'blue-on');
        setTimeout(function() {
          $("#green").attr('class', 'green-off');
          $("#red").attr('class', 'red-off');
          $("#yellow").attr('class', 'yellow-off');
          $("#blue").attr('class', 'blue-off');
          setTimeout(function(){
            if(strict){
              melody = [];
              upgradeMelody();
            }else{playMelody();}


          }, 1000);

        }, 500);



      }
    }

  } //fin checkResult

  function victory(){

    $("#display").html("88");

    $("#green").attr('class', 'green-on');
    $("#red").attr('class', 'red-on');
    $("#yellow").attr('class', 'yellow-on');
    $("#blue").attr('class', 'blue-on');
    setTimeout(function() {
      $("#display").html("");
      $("#green").attr('class', 'green-off');
      $("#red").attr('class', 'red-off');
      $("#yellow").attr('class', 'yellow-off');
      $("#blue").attr('class', 'blue-off');
      setTimeout(function(){
        $("#display").html("88");
        $("#green").attr('class', 'green-on');
        $("#red").attr('class', 'red-on');
        $("#yellow").attr('class', 'yellow-on');
        $("#blue").attr('class', 'blue-on');
        setTimeout(function() {
          $("#display").html("");
          $("#green").attr('class', 'green-off');
          $("#red").attr('class', 'red-off');
          $("#yellow").attr('class', 'yellow-off');
          $("#blue").attr('class', 'blue-off');
          setTimeout(function(){
            poweringUp();
          }, 500);

        }, 500);
      }, 500);

    }, 500);

  }

}) // fin doc ready