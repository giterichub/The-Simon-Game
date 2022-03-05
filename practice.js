var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var identify;

$(document).keydown(function(){
  if(!started){
    setTimeout(function(){
      nextSequence();
    },500);
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " +level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(tune) {
  var audio = new Audio("sounds/" + tune + ".mp3");
  audio.play();
}

function animatePress(buttonEffects) {
  $("." + buttonEffects).addClass("pressed");
  setTimeout(function() {
    $("." + buttonEffects).removeClass("pressed");
  }, 100);
}

$(".btn").click(function() {
  identify = this.id;
  userClickedPattern.push(identify);
  playSound(identify);
  animatePress(identify);
  checkAnswer(userClickedPattern.lastIndexOf(identify));
});

function checkAnswer(indexOfUserClick) {
  if (gamePattern[indexOfUserClick] === userClickedPattern[indexOfUserClick]) {
    var count = 0;
    for(var i = 0; i < userClickedPattern.length; i++){
      if(gamePattern[i] === userClickedPattern[i]){
        count++;
      }
    }
    if(count === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }

  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over Press Any key To Continue");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}
function startOver(){
  gamePattern = [];
  level = 0;
  started = false;
}
