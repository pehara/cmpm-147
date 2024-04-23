let seed = 239;

const skyColors = ["#085FAD", "#AD70B0", "#FAA395", "#B7B8D8"];
const snowColor = "#BFCAED";

let mouseXOffset = 0;
let mouseYOffset = 0;

function setup() {
  createCanvas(800, 600);
  createButton("reimagine").mousePressed(() => seed++);
}

function draw() {
  randomSeed(seed);

  mouseXOffset = mouseX - width / 2;
  mouseYOffset = mouseY - height / 2;

  // Sky gradient
  drawBlendedGradientSky(0, 0, width, height / 1.5, skyColors);

  // Ground
  fill(snowColor);
  rect(0, height / 2, width, height / 2);

  // Mountains
  drawMountains();

  // Trees
  drawTrees();

  // Snow
  drawSnowLayers();
}

// Gradient sky
function drawBlendedGradientSky(x, y, w, h, colors) {
  for (let i = 0; i < colors.length - 1; i++) {
    let interA = lerpColor(color(colors[i]), color(colors[i + 1]), 0.25);
    let interB = lerpColor(color(colors[i]), color(colors[i + 1]), 0.5);
    let interC = lerpColor(color(colors[i]), color(colors[i + 1]), 0.75);

    fill(colors[i]);

    rect(x, y + (h / colors.length) * i, w, h / colors.length);
    fill(interA);
    rect(
      x,
      y + (h / colors.length) * i + (h / colors.length) * 0.25,
      w,
      (h / colors.length) * 0.25
    );
    fill(interB);
    rect(
      x,
      y + (h / colors.length) * i + (h / colors.length) * 0.5,
      w,
      (h / colors.length) * 0.25
    );
    fill(interC);
    rect(
      x,
      y + (h / colors.length) * i + (h / colors.length) * 0.75,
      w,
      (h / colors.length) * 0.25
    );
  }
}

// Mountains
function drawMountains() {
  const mountainColor = "#B0C0F8";
  fill(mountainColor);
  beginShape();
  vertex(0, height / 2);
  const steps = 10;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height / 2 - (random() * random() * random() * height) / 4 - height / 50;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);
}

// Trees
function drawTrees() {
  const treeColor = "#224068";
  const minTreeSize = height / 5;
  const maxTreeSize = height / 3;
  const minTrees = 30;
  const maxTrees = 70;
  const trees = random(minTrees, maxTrees);
  const scrub = mouseX / width;

  fill(treeColor);

  noStroke();
  for (let i = 0; i < trees; i++) {
    let z = random();
    let x = width * ((random() + (scrub / 50 + millis() / 500000.0) / z) % 1);
    let s = random(minTreeSize, maxTreeSize);
    let y = height / 2 + height / 20 / z;

    triangle(x, y - s, x - s / 4, y, x + s / 4, y);
  }
}

// Function to draw a snowflake polygon
function drawSnowflake(x, y, size) {
  // Define the points of the snowflake polygon
  let numPoints = 6; // Number of points for the snowflake
  let angle = TWO_PI / numPoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * size * random(0.8, 1.2);
    let sy = y + sin(a) * size * random(0.8, 1.2);
    vertex(sx, sy);
    sx = x + cos(a + angle / 2) * size * random(0.8, 1.2);
    sy = y + sin(a + angle / 2) * size * random(0.8, 1.2);
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// Snow
function drawSnow(layer, speed) {
  const numSnowflakes = 100;
  const minSize = 2;
  const maxSize = 6;

  for (let i = 0; i < numSnowflakes; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(minSize, maxSize);
    let drift = layer === "background" ? 0.5 : 1;

    x += mouseXOffset * 0.1;
    y += mouseYOffset * 0.1;

    fill(255);
    drawSnowflake(x, y, size); // Draw snowflake as a polygon

    // Snow movement
    if (layer === "background") {
      y += speed * drift;
    } else {
      y += speed;
    }

    y += 0.5;

    if (y > height) {
      y = random(-50, -10);
    }
  }
}

// Drawing Snow
function drawSnowLayers() {
  drawSnow("background", 1);

  drawSnow("foreground", 2);
}
