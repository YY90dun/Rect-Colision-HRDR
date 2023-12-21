// Get canvas and context
const cnv = document.getElementById("gameCanvas");
const ctx = cnv.getContext("2d");

// Fit the canvas to the window size
cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

let player = {
  x: 25,
  y: cnv.height / 2 - 5,
  w: 20,
  h: 20,
  speed: 5,
  color: "#0000ff",
};

let leftarrow_prst = false;
let rightarrow_prst = false;
let uparrow_prst = false;
let downarrow_prst = false;

// Global Variables
let walls = [];
walls.push(newWall(0, 0, cnv.width, 20));
walls.push(newWall(0, 0, 20, cnv.height));
walls.push(newWall(0, cnv.height - 20, cnv.width, cnv.height));
walls.push(newWall(cnv.width - 20, 0, cnv.width, cnv.height));
walls.push(newWall(500, 0, 50, 200));
walls.push(newWall(cnv.width - 300, cnv.height / 2 - 100, 50, 200));
walls.push(newWall(250, cnv.height - 270, 50, 200));
walls.push(newWall(550, cnv.height - 200, 200, 50));
walls.push(newWall(cnv.width - 980, cnv.height / 2 - 140, 200, 50));

// Game loop
function gameLoop() {
  // Clear canvas
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  // Draw walls
  drawPlaya();
  collisions();
  drawWalls();

  requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();

function drawWalls() {
  ctx.fillStyle = "#7f7f7f";
  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
  }
}

function newWall(x, y, w, h) {
  return {
    x: x,
    y: y,
    w: w,
    h: h,
  };
}

function TPplayer(xx, yy) {
  player = {
    x: xx,
    y: yy,
    w: 20,
    h: 20,
    speed: 5,
    color: "#0000ff",
  };
}

function drawPlaya() {
  if (rightarrow_prst) {
    player.x += player.speed;
  }
  if (leftarrow_prst) {
    player.x -= player.speed;
  }
  if (uparrow_prst) {
    player.y -= player.speed;
  }
  if (downarrow_prst) {
    player.y += player.speed;
  }

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

function collisions() {
  for (let i = 0; i < walls.length; i++) {
    let woall = walls[i];
    if (
      wallsHit(
        player.x,
        player.y,
        player.w,
        player.h,
        player.speed,
        woall.x,
        woall.y,
        woall.w,
        woall.h
      )
    ) {
      player.x += Xwuttodo(player.x, player.w, woall.x, woall.w) * player.speed;
      player.y += Ywuttodo(player.y, player.h, woall.y, woall.h) * player.speed;
    }
  }
}

document.addEventListener("keydown", pressmehandle);

function pressmehandle(e) {
  if (e.code == "ArrowLeft") {
    leftarrow_prst = true;
  }
  if (e.code == "ArrowRight") {
    rightarrow_prst = true;
  }
  if (e.code == "ArrowUp") {
    uparrow_prst = true;
  }
  if (e.code == "ArrowDown") {
    downarrow_prst = true;
  }
}

document.addEventListener("keyup", leggomehandle);

function leggomehandle(e) {
  if (e.code == "ArrowLeft") {
    leftarrow_prst = false;
  }
  if (e.code == "ArrowRight") {
    rightarrow_prst = false;
  }
  if (e.code == "ArrowUp") {
    uparrow_prst = false;
  }
  if (e.code == "ArrowDown") {
    downarrow_prst = false;
  }
}

function wallsHit(px, py, pw, ph, sp, wx, wy, ww, wh) {
  let colchunk = 0;
  if (px - sp < wx + ww) {
    colchunk++;
  }
  if (px + sp + pw > wx) {
    colchunk++;
  }
  if (py + sp + ph > wy) {
    colchunk++;
  }
  if (py - sp < wy + wh) {
    colchunk++;
  }
  if (colchunk == 4) {
    return true;
  } else {
    return false;
  }
}

function Xwuttodo(px, pw, wx, ww) {
  let LR = 0;

  if (px + pw > wx + ww) {
    LR += 1;
  }
  if (px < wx) {
    LR -= 1;
  }

  return LR;
}

function Ywuttodo(py, ph, wy, wh) {
  let UD = 0;

  if (py + ph > wy + wh) {
    UD += 1;
  }
  if (py < wy) {
    UD -= 1;
  }

  return UD;
}
