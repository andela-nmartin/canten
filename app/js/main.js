/*
* TO_DO
* If the bat does not touch the ball then a point is added to opponent
* After the miss, a new serve should occur
* The game should end after 10 sets
*/

var canvas;
var ctx;
var dy = 5;
var x = 0;
var xpoint = 0;
var xpos = 0;
var ypoint = 0;
var ypos = 0;
var starty = Math.random() * 150;
var endy = Math.random() * 150;
var diff = (endy - starty)/60;
var righty = 65
var lefty = 65;
var WIDTH = 300;
var HEIGHT = 150;

// the dividing center
function divider() {
  ctx.strokeStyle='#000';
  ctx.moveTo(150,0);
  ctx.lineTo(150,150);
  ctx.stroke();
}

// rendering the left bat
function leftBat(y) {
  ctx.fillStyle = '#FF6801';
  ctx.fillRect(0, y, 2, 20);
}

// rendering the right bat
function rightBat(y) {
  ctx.fillStyle = '#FF6801';
  ctx.fillRect(298, y, 2, 20);
}

// rendering the ball
function ball(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.fillStyle = '#f00';
  ctx.fill();
  ctx.closePath();
}

var possiblePoints = [];
for (var i = 0; i <= 300/dy; i++) {
  possiblePoints.push(i * dy);
}

// to handle the key press events for the bats
function doKeyDown(evt) {
  switch (evt.keyCode) {
    case 38:
      /* Up arrow was pressed */
      if (righty - dy > -5) {
        righty -= dy;
      }
      break;
    case 40:
      /* Down arrow was pressed */
      if (righty + dy < HEIGHT-15) {
        righty += dy;
      }
      break;
    case 87:
      /* W key was pressed */
      if (lefty - dy > -5) {
        lefty -= dy;
      }
      break;
    case 83:
      /* S key was pressed */
      if (lefty + dy < HEIGHT-15) {
        lefty += dy;
      }
      break;
  }
}
function moveBall() {
  /* The ball needs to move from any random point on
  the left side of the table in any random direction.
  If it does not intercept any of the bats then it should
  exit the round. */

  xpos = x % 120;
  ypos = starty % 300;
  if (xpos < 60) {
    if (xpos === 0) {
      document.getElementById('left-player').innerText = parseInt(document.getElementById('left-player').innerText) + 1;
    }
    xpoint = x % 60 // if not on the bat's edge then call modal
    if (ypos < 150) {
      ypoint = (starty % 150) + diff;
      ball(possiblePoints[xpoint], ypoint, 5);
    } else {
      ypoint = 150 - ((starty % 150) + diff);
      ball(possiblePoints[xpoint], ypoint, 5);
    }
  } else {
    if (xpos === 60) {
      document.getElementById('right-player').innerText = parseInt(document.getElementById('right-player').innerText) + 1;
    }

    xpoint = (60 - x % 60); // if not on the bat's edge then call modal
    if (ypos < 150) {
      ypoint = (starty % 150) + diff;
      ball(possiblePoints[xpoint], ypoint, 5);
    } else {
      ypoint = 150 - ((starty % 150) + diff);
      ball(possiblePoints[xpoint], ypoint, 5);
    }
  }
  x = x + 1;
  starty = starty + 1;
}

// the initial canvas component rendering
function init() {
  canvas = document.getElementById('play-field');
  ctx = canvas.getContext('2d');
  return setInterval(draw, 20);
}

// rendering all the components
function draw() {
  clear();
  divider();
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  leftBat(lefty);
  rightBat(righty);
  ctx.fillStyle = 'black';
  moveBall();
}

// clear the canvas
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// function call execution
init();
window.addEventListener('keydown', doKeyDown, true);
