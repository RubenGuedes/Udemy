let bclass = document.querySelectorAll(".drum");

for (let i = 0; i < bclass.length; i++) {
  bclass[i].addEventListener("click", handleClick);
}

function handleClick() {
  alert("I got clicked!");
}
