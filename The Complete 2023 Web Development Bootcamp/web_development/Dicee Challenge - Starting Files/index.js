const MAX = 6;

function randValue(max)
{
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function refreshPage()
{
  let randomNumber1 = randValue(MAX);
  let randomNumber2 = randValue(MAX);

  let dice1 = "images/dice" + randomNumber1 + ".png";
  let dice2 = "images/dice" + randomNumber2 + ".png";

  document.querySelector(".d1").setAttribute("src", dice1);
  document.querySelector(".d2").setAttribute("src", dice2);

  let h1Tag = document.querySelector("h1");

  if (randomNumber1 > randomNumber2)
  {
    h1Tag.innerHTML = "🚩 Player 1 Wins";
  }
  else if (randomNumber1 === randomNumber2)
  {
    h1Tag.textContent = "Draw";
  }
  else
  {
    h1Tag.innerHTML = "Player 2 Wins 🚩";
  }
}

refreshPage();
