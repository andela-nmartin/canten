var canvas;
var ctx;
var dx = 5;
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
  ctx.fillStyle = '#000';
  ctx.fillRect(0, y, 4, 20);
}

// rendering the right bat
function rightBat(y) {
  ctx.fillStyle = '#000';
  ctx.fillRect(296, y, 4, 20);
}

// rendering the ball
function ball(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.fillStyle = '#f00';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.stroke();
}

var possiblePoints = [];
for (var i = 0; i <= 300/dy; i++) {
  possiblePoints.push(i * dy);
}

/* The ball needs to move from any random point on
the left side of the table in any random direction.
If it does not intercept any of the bats then it should
exit the round. */

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
      if (lefty - dx > -5) {
        lefty -= dx;
      }
      break;
    case 83:
      /* S key was pressed */
      if (lefty + dx < HEIGHT-15) {
        lefty += dx;
      }
      break;
  }
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
  // move the ball
  console.log(diff);
  xpos = x % 120;
  ypos = starty % 300;
  if (xpos <= 60) {
    xpoint = x % 60;
    if (ypos <= 150) {
      ypoint = (starty % 150) + diff;
      ball(possiblePoints[xpoint], ypoint, 5);
    } else {
      ypoint = 150 - ((starty % 150) + diff);
      ball(possiblePoints[xpoint], ypoint, 5);
    }
  } else {
    xpoint = (60 - x % 60);
    if (ypos <= 150) {
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

// clear the canvas
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// function call execution
init();
window.addEventListener('keydown',doKeyDown,true);
