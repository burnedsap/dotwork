// Agent code taken from Nature of Code
var W = document.getElementById("sketch-holder").offsetWidth;
var H = 500;
var H = 500;
let rm;

var wA = [];
var timeR1, timeR2;
let tX1 = -100;
let tY1 = -100;

function setup() {
  frameRate(30);
  var canvas = createCanvas(W, H);
  canvas.parent("sketch-holder");
  wA.push(new Vehicle(width / 2, height / 2, true));

  rm = new Agent(width / 2, height / 2);

  let button = createButton("refresh sketch");
  button.mousePressed(resetSketch);
  button.parent("sketch-buttons");
}

function resetSketch() {
  window.location.reload();
}

function draw() {
  background(240);

  if (frameCount == 40) {
    rm = new Agent(width / 2, height / 2);
  }
  if (frameCount > 40) {
    let target = createVector(wA[0].loc.x, wA[0].loc.y);
    let steering = rm.arrive(target);
    rm.applyForce(steering);
    rm.update();
    rm.show();
  }

  if (wA.length < 180) {
    if (frameCount % 50 == 0) {
      var temp = wA.length;
      for (var j = 0; j < temp; j++) {
        if (wA[j].lifespan > 0) {
          wA.push(new Vehicle(wA[j].loc.x, wA[j].loc.y, false));
        }
      }
    }
  }
  if (frameCount > 601) {
  }
  if (wA.length > 3) {
    if (frameCount == 151) {
      tX1 = wA[0].loc.x;
      tY1 = wA[0].loc.y;
    }
    fill(0, 50, 0, 100);
      ellipse(tX1, tY1, 40, 40);
  }

  for (var i = 0; i < wA.length; i++) {
    wA[i].run();
  }

  if (frameCount > 601) {
    wA[0].speed = 0.1;
    if (abs(rm.pos.x - wA[0].loc.x < 2) && abs(rm.pos.y - wA[0].loc.y) < 2) {
      wA[0].speed = 0.0;
      rm.maxSpeed = 0.0;
      rm.maxForce = 0.0;
      
      //Mark Garden
      noStroke();
      textAlign(CENTER);
      fill(50);
      text("Garden of \nForking Paths", tX1, tY1 + 35);
      
      
      //Mark Alber City
      fill(200, 100);
      ellipse(W / 2, H / 2, 200, 200);
      fill(51);
      text("Albert", W / 2, H / 2 + 120);
      
      //Mark Yu Tsun and Albert
      fill(51);
      text("Yu Tsun", wA[0].loc.x, wA[0].loc.y+15);
      fill(200, 0, 0);
      text("Richard Madden", rm.pos.x, rm.pos.y-15);
    }
  }
}

class Vehicle {
  constructor(tX, tY, check) {
    this.loc = {
      x: tX,
      y: tY
    };
    this.x1 = tX;
    this.y1 = tY;
    this.arrList = [];
    this.speed = random(1, 2);
    this.check = check;
    if (this.check) {
      this.lifespan = 6000;
    } else {
      this.lifespan = random(100, 200);
    }

    this.lifespanInit = this.lifespan;
    this.tx = random(100);
    this.ty = random(10000);
  }

  run() {
    if (this.lifespan > 0) {
      this.update();
    }
    this.display();
  }

  update() {
    this.lifespan += -1;

    this.tempX = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.tempY = map(noise(this.ty), 0, 1, -this.speed, this.speed);

    this.tx += 0.01;
    this.ty += 0.01;
    this.loc.x += this.tempX;
    this.loc.y += this.tempY;

    let newX = this.loc.x;
    let newY = this.loc.y;
    let newPos = {
      x: this.loc.x,
      y: this.loc.y
    };

    let arr = this.arrList;
    arr.push(newPos);
    this.arrList = arr;
    this.loc = newPos;
  }

  display() {
    push();
    noStroke();
    translate(this.loc.x, this.loc.y);
    if (this.check) {
      fill(0);
      ellipse(0, 0, 5, 5);
    }
    if (this.check) {
      if (this.lifespan == 0) {
        fill(51);
        text("Yu Tsun", 0, 0);
        fill(200, 0, 0);
        text("Richard Madden", 0, -15);
      }
    }
    //text(this.lifespan, 0, 0);
    // if(this.lifespan>0){
    // point(0, 0);
    // }
    pop();

    noFill();
    beginShape();
    if (this.check) {
      stroke(100);
      strokeWeight(2);
    } else {
      if (frameCount > 150) {
        stroke(map(this.lifespan, this.lifespanInit, 0, 100, 150));
        strokeWeight(map(this.lifespan, this.lifespanInit, 0, 1.5, 0.4));
      } else {
        strokeWeight(0);
      }
    }
    for (let i = 0; i < this.arrList.length; i++) {
      vertex(this.arrList[i].x, this.arrList[i].y);
    }
    endShape();
  }
}

class Agent {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 0.4;
    this.maxForce = 0.1;
    this.r = 5;
  }

  evade(agent) {
    let pursuit = this.pursue(agent);
    pursuit.mult(-1);
    return pursuit;
  }

  pursue(agent) {
    let target = agent.pos.copy();
    let prediction = agent.vel.copy();
    prediction.mult(10);
    target.add(prediction);
    fill(0, 255, 0);
    circle(target.x, target.y, 16);
    return this.seek(target);
  }

  arrive(target) {
    // 2nd argument true enables the arrival behavior
    return this.seek(target, true);
  }

  flee(target) {
    return this.seek(target).mult(-1);
  }

  seek(target, arrival = false) {
    let force = p5.Vector.sub(target, this.pos);
    let desiredSpeed = this.maxSpeed;
    if (arrival) {
      let slowRadius = 0;
      let distance = force.mag();
      if (distance < slowRadius) {
        desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed);
      }
    }
    force.setMag(desiredSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    return force;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    noStroke();
    fill(240, 0, 0);
    circle(this.pos.x, this.pos.y, 5);
  }

  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
}

class Target extends Agent {
  constructor(x, y) {
    super(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(5);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill("#F063A4");
    push();
    translate(this.pos.x, this.pos.y);
    circle(0, 0, this.r * 2);
    pop();
  }
}

