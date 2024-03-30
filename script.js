
let car;
let resetButton;
let metronome;
let meterstick;
let ruler;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  rectMode(CENTER);
  laser = new Laser(width / 2, height / 2, 1);
  //ruler = new Ruler(width / 4, 250, 20, 400);
  //car.on = true
}

function draw() {
  background(220);
  laser.display();
  laser.move();
  //ruler.display(mouseX, mouseY);
}

class Laser {
  constructor(x, y, v) {
    this.x = x;
    this.y = y;
    this.v = v;
    this.on = false;
    this.dragging = false;
    this.turning = false;
    this.direction = createVector(0, 1);
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

class Ruler {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 400;
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  display() {
    push();
    fill(240, 240, 140);
    noStroke();
    translate(this.x, this.y);
    rect(0, 0, this.w, this.h);
    tickMarks(-this.w / 2, -this.h / 2, 4);
    pop();
  }
  
  pickedUp() {
     if (abs(this.x - mouseX) < this.w/2 && abs(this.y - mouseY) < this.h/2) {
      console.log("hi");
      this.dragging = true;
      this.x = mouseX;
      this.y = mouseY;
    }
    if (
      abs(this.x - mouseX ) < this.w/2 &&
      abs(this.y + this.h/2 - mouseY) < this.h/2
    ) {
      console.log("turning");
     // this.turning = true;
      this.dragging = false;
      
    }
    /*
    if (
      abs(this.x - mouseX - this.direction.x * 20) < 7 &&
      abs(this.y - this.direction.y * 20 - mouseY) < 7
    ) {
      console.log("switch");
      this.turning = false;
      this.dragging = false;
      this.on = !this.on;
    }
    */
  }

  pressed(px, py) {
    if (
      px > this.x - this.w / 2 &&
      px < this.x + this.w / 2 &&
      py > this.y - this.h / 2 &&
      py < this.y + this.h / 2
    ) {
      this.dragging = true;
      this.offsetX = this.x - px;
      this.offsetY = this.y - py;
    }
  }

  notPressed(px, py) {
    this.dragging = false;
  }
}

function mousePressed() {
  laser.pickedUp();
 // ruler.pickedUp();
}
function mouseReleased() {
  laser.dragging = false;
  laser.turning = false;
}

function tickMarks(x, y, s) {
  stroke(0);
  for (let i = 0; i < 101; i++) {
    line(x, y + s * i, x + 2 + 4 * ((i + 1) % 2), y + s * i);
    if (i % 10 == 0) {
      line(x, y + s * i, x + 10, y + s * i);
      noStroke();
      fill(0);
      textSize(10);
      text(100 - i, x + 10, y + s * i);
      stroke(0);
    }
  }
}
