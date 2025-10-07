let rA = [];
let rB = [];

let gridSize;
let cellSize;
let pgA;
let pgB;

let paleta = ["#ff9500", "#006fff", "#d000ff", "#949494", "#00ff3c"];
let corA;
let corB;

function setup() {
  createCanvas(windowHeight, windowHeight);

  pgA = createGraphics(width / 2, height / 2);
  pgB = createGraphics(width / 2, height / 2);
  pgA.noStroke();
  pgA.rectMode(CENTER);
  pgA.ellipseMode(CENTER);
  pgB.noStroke();
  pgB.rectMode(CENTER);
  pgB.ellipseMode(CENTER);

  initGrid(rA);
  initGrid(rB);
}
let t;
function draw() {
  blendMode(BLEND);
  background(0);
  t = map(sin(frameCount * 0.02), -1, 1, 0, 1);
  t = easeInOutQuart(t);
  if (t < 0.001) {
    initGrid(rA);
    initGrid(rB);
  }
  fill(255);
  // text(t, 10, 10);
  blendMode(SCREEN);
  desenhaBase(rA, pgA, corA, color("#000"));
  desenha(pgA);
  desenhaBase(rB, pgB, corB, color("#000"));
  desenha(pgB);
}

function desenhaBase(r, p, cA, cB) {
  p.background(cB);
  let counter = 0;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (r[counter] > 0.5) p.fill(cB);
      else p.fill(cA);
      let x = i * cellSize + cellSize / 2;
      let y = j * cellSize + cellSize / 2;
      p.rect(x, y, cellSize * t, cellSize * t, cellSize * (1 - t));
      counter++;
    }
  }

  for (let i = 0; i <= gridSize; i++) {
    for (let j = 0; j <= gridSize; j++) {
      if ((i + j) % 2 == 0) p.fill(cB);
      else p.fill(cA);
      let x = i * cellSize;
      let y = j * cellSize;
      p.ellipse(x, y, cellSize * t, cellSize * t);
    }
  }
}

function desenha(p) {
  push();
  image(p, 0, 0);

  translate(width, 0);
  scale(-1, 1);
  image(p, 0, 0);

  translate(0, height);
  scale(1, -1);
  image(p, 0, 0);

  translate(width, 0);
  scale(-1, 1);
  image(p, 0, 0);

  pop();
}

function initGrid(r) {
  gridSize = floor(random(1, 6));
  cellSize = pgA.width / gridSize;
  corA = paleta[floor(random(paleta.length))];
  corB = paleta[frameCount % paleta.length];
  let counter = 0;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      r[counter] = random(1);
      counter++;
    }
  }
}

function easeInOutQuad(x) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function easeInOutQuart(x) {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

function keyPressed() {
  // save();
}
