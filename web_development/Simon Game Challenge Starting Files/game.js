const MAX = 4;
const BUTTONCOLOURS = ["red", "blue", "green", "yellow"];

let level = 0;
let gamePattern = [];
let userClickedPattern = [];

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * Math.floor(MAX));
  let randomChosenColour = BUTTONCOLOURS[randomNumber];

  gamePattern.push(randomChosenColour);

  let element = "." + randomChosenColour;
  let soundFile = "sounds/" + randomChosenColour + ".mp3"

  // Animation
  $(element).animate( {opacity: '0.5'}, 100,
    function () {
      playSound(soundFile);
      $(element).animate( {opacity: '1'}, 100 );
    }
  );

  $("h1").text("Level " + level);
  level += 1;
}

function playSound(soundFile) {
  new Audio(soundFile).play();
}

function animatePress(currentColour) {
  let id = "#" + currentColour;

  $(id).addClass("pressed");
  setTimeout( function() {$(id).removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel) {
  let lastIndexUser = userClickedPattern.length - 1;

  if (gamePattern[lastIndexUser] === userClickedPattern[lastIndexUser]) {

    if (userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function() {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  }
  else
  {
    playSound("wrong");

    // Animation (Restart Game)
    $("body").addClass("game-over");
    setTimeout( function() {$("body").removeClass("game-over");}, 200);
    $("h1").text("Game Over, Press A Key to Restart");
  }
}

// Press Button
$(".btn").click(function() {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  let element = "." + userChosenColour;
  let soundFile = "sounds/" + userChosenColour + ".mp3"

  // Play sound
  playSound(soundFile);
  // Animation
  animatePress(userChosenColour);
  // Confirm answer
  checkAnswer(level);
});

// Keypress
$(document).keypress(function(event) {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];

  let key = event.key;

  if (key === "a") {
    nextSequence();
  }
});
