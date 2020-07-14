let bclass = document.querySelectorAll(".drum");

for (let i = 0; i < bclass.length; i++) {
  bclass[i].addEventListener("click", function() {
      let buttonInnerHTML = this.innerHTML;
      makeSound(buttonInnerHTML);
      buttonAnimation(buttonInnerHTML);
    }
  );
}

addEventListener( "keydown", function(event) {
  makeSound(event.key);
  buttonAnimation(buttonInnerHTML);
});

function makeSound(key) {

  switch (key) {
    case "w":
      new Audio('sounds/crash.mp3').play();
      break;

    case "a":
      new Audio('sounds/kick-bass.mp3').play();
      break;

    case "s":
      new Audio('sounds/snare.mp3').play();
      break;

    case "d":
      new Audio('sounds/tom-1.mp3').play();
      break;

    case "j":
      new Audio('sounds/tom-2.mp3').play();
      break;

    case "k":
      new Audio('sounds/tom-3.mp3').play();
      break;

    case "l":
      new Audio('sounds/tom-4.mp3').play();
      break;
  }
}

function buttonAnimation(currentKey) {

  let activeButton = document.querySelector("." + currentKey);

  activeButton.classList.add("pressed");
  setTimeout(
    function () {
      activeButton.classList.remove("pressed");
    }, 100);
}
