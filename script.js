
let laser;
let resetButton;


function setup() {
  createCanvas(800, 400);
  angleMode(DEGREES);
  rectMode(CENTER);
  let initialLaserPos = createVector(width / 2, height / 2);
  let initialHeading = createVector(1, 0);
  laser = new Laser(initialLaserPos, initialHeading);
}

function draw() {
  background(220);
  laser.display();
  laser.move();
}

class Laser {
  constructor(posVec, directionVec) {
    this.x = posVec.x;
    this.y = posVec.y;
    this.direction = directionVec;
    this.on = false;
    this.dragging = false;
    this.turning = false;
 
  }
  move() {
    if (this.on) {
      stroke(250,0,0)
      strokeWeight(10)
    
      //this.y += this.direction.y;
      //this.x += this.direction.x;
    } else if (this.dragging) {
      this.x = mouseX;
      this.y = mouseY;
    } else if (this.turning) {
      this.direction.setHeading(radians(this.direction.heading() + 90));
      this.turning = false;
    }
      line(this.x+30*this.direction.x, this.y+30*this.direction.y, this.x+400*this.direction.x, this.y+400*this.direction.y)
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.direction.heading() - 90);
    rectMode(CENTER);
    noStroke();
    fill(200, 0, 0);
    rect(0, 0, 18, 54);
    stroke(0);
    strokeWeight(0.5);
    rect(0, 0, 20, 15);
    noStroke();
    fill(250, 250, 0);
    ellipse(0, 25, 9, 4);
    noFill();
    stroke(0);
    strokeWeight(0.5);
    arc(0, 0, 36, 36, 60, 120, OPEN);
    line(-9, 17, -4, 13);
    line(-9, 17, -4, 21);
    strokeWeight(2);
    line(-7, -17, 7, -17);
    line(0, -17, -4 + 8 * this.on, -21);
    pop();
  }

  pickedUp() {
    if (abs(this.x - mouseX) < 8 && abs(this.y - mouseY) < 8) {
      console.log("hi");
      this.dragging = true;
      this.on = false;
      this.x = mouseX;
      this.y = mouseY;
    }
    if (
      abs(this.x - mouseX + this.direction.x * 20) < 8 &&
      abs(this.y + this.direction.y * 20 - mouseY) < 7
    ) {
      console.log("turning");
      this.turning = true;
      this.dragging = false;
      this.on = false;
    }
    if (
      abs(this.x - mouseX - this.direction.x * 20) < 7 &&
      abs(this.y - this.direction.y * 20 - mouseY) < 7
    ) {
      console.log("switch");
      this.turning = false;
      this.dragging = false;
      this.on = !this.on;
    }
  }
}

class Beam {
  constructor(startPos, headingVec) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 400;
  }

  display() {
    push();
    fill(240, 240, 140);
    pop();
  }
  
}

function mousePressed() {
  laser.pickedUp();
}
function mouseReleased() {
  laser.dragging = false;
  laser.turning = false;
}
