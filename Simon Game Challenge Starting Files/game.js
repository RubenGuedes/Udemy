const MAX = 4;
const BUTTONCOLOURS = ["red", "blue", "green", "yellow"];
var gamePattern = [];

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * Math.floor(MAX));
  let randomChosenColour = BUTTONCOLOURS[randomNumber];

  gamePattern.push(randomChosenColour);

  let element = "." + randomChosenColour;
  let soundFile = "sounds/" + randomChosenColour + ".mp3"

  // Animation
  $(element).animate( {opacity: '0.5'}, 100,
    function () {
      new Audio(soundFile).play();
      $(element).animate( {opacity: '1'}, 100 );
    }
  );
}

// Press Button
/*$(".btn").click( function() {
  console.log(this);
});*/
