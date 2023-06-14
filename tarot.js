var cards;

fetch('./many_things.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    cards = data.cards;
  })
  .catch(error => console.log(error));

var draw = document.getElementById('draw-button');

var next_side = 'front';
var count = 0;

draw.addEventListener('click', function() {
  var drawn = drawCard();

  var card = document.getElementById("content");

  if(next_side == 'front') {
    card.classList.add("flip");
    document.getElementById("front-svg").src = drawn.src;
  } else {
    card.classList.remove("flip");
    document.getElementById("back-svg").src = drawn.src;
  }

  var id = "card-name-" + next_side;
  document.getElementById(id).innerHTML = drawn.name;

  if(next_side == 'front') {
    next_side = 'back';
  } else {
    next_side = 'front';
  }

  if(count < 2) {
    if(count == 1) {
      document.getElementById("back-icon").style.display = "none";
      document.getElementById("back").style.alignItems = "flex-end";
      document.getElementById("card-image-back").style.display = "block";
    }
    count++;
  }
  
});

function drawCard() {
  var card = cards[Math.floor(Math.random()*cards.length)];

  return card;
}