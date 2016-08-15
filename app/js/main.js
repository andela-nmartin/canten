var canvas;
var ctx;
var dx = 5;
var dy = 5;
var x = 0;
var y = Math.random() * 150;
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
  ctx.fillStyle = '#F30';
  ctx.fillRect(0, y, 4, 20);
}

// rendering the right bat
function rightBat(y) {
  ctx.fillStyle = '#F30';
  ctx.fillRect(296, y, 4, 20);
}

// rendering the ball
function ball(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.stroke();
}

// to handle the key press events for the bats
function doKeyDown(evt) {
  switch (evt.keyCode) {
    case 38:
      /* Up arrow was pressed */
      if (righty - dy > 0) {
        righty -= dy;
      }
      break;
    case 40:
      /* Down arrow was pressed */
      if (righty + dy < HEIGHT) {
        righty += dy;
      }
      break;
    case 87:
      /* W key was pressed */
      if (lefty - dx > 0) {
        lefty -= dx;
      }
      break;
    case 83:
      /* S key was pressed */
      if (lefty + dx < WIDTH) {
        lefty += dx;
      }
      break;
  }
}

// the initial canvas component rendering
function init() {
  canvas = document.getElementById('play-field');
  ctx = canvas.getContext('2d');
  return setInterval(draw, 10);
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
  ball(x, y, 5);
}

// clear the canvas
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// function call execution
init();
window.addEventListener('keydown',doKeyDown,true);
