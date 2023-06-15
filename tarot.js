var cards;
fillDeck();

function fillDeck() {
  fetch('./many_things.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    cards = data.cards;
  })
  .catch(error => console.log(error));
}

var draw = document.getElementById('draw-button');

var next_side = 'front';

draw.addEventListener('click', function() {
  var drawn = drawCard();
  var card = document.getElementById("content");

  if(drawn == -1) {
    if(next_side == 'front') {
      card.classList.add("flip");
      document.getElementById("front-icon").style.display = "block";
      document.getElementById("front").style.alignItems = "center";
      document.getElementById("card-image-front").style.display = "none";
    } else {
      card.classList.remove("flip");
      document.getElementById("back-icon").style.display = "block";
      document.getElementById("back").style.alignItems = "center";
      document.getElementById("card-image-back").style.display = "none";
    }

    var id = "card-name-" + next_side;
    document.getElementById(id).innerHTML = "";
  } else {
    if(next_side == 'front') {
      card.classList.add("flip");
      document.getElementById("front-svg").src = drawn.src;
      document.getElementById("front-icon").style.display = "none";
      document.getElementById("front").style.alignItems = "flex-end";
      document.getElementById("card-image-front").style.display = "block";
    } else {
      card.classList.remove("flip");
      document.getElementById("back-svg").src = drawn.src;
      document.getElementById("back-icon").style.display = "none";
      document.getElementById("back").style.alignItems = "flex-end";
      document.getElementById("card-image-back").style.display = "block";
    }

    var id = "card-name-" + next_side;
    document.getElementById(id).innerHTML = drawn.name;
  }

  if(next_side == 'front') {
    next_side = 'back';
  } else {
    next_side = 'front';
  }
});

var shuffle = false;

function drawCard() {
  if(shuffle) {
    document.getElementById("draw-button").innerHTML = "draw a card";
    shuffle = false;

    return -1;
  }

  var index = Math.floor(Math.random()*cards.length)
  var card = cards[index];

  cards.splice(index, 1);
  console.log(Object.keys(cards).length);

  if(Object.keys(cards).length == 0) {
    console.log("hello")

    document.getElementById("draw-button").innerHTML = "shuffle deck";
    shuffle = true;

    fillDeck();
    console.log(cards);
  }

  return card;
}