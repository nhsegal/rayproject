
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
    this.beam = new Beam(createVector(posVec.x+30, posVec.y+30), directionVec)
 
  }
  move() {
   if (this.dragging) {
      this.x = mouseX;
      this.y = mouseY;
      this.beam.x = mouseX;
      this.beam.y = mouseY;
    } else if (this.turning) {
      this.direction.setHeading(radians(this.direction.heading() + 90));
      this.turning = false;
    }
    
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
    this.beam.display()
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
    this.x = startPos.x;
    this.y = startPos.y;
    this.direction = headingVec;
    this.segments = [];
    this.segments.push(startPos);
  }

  display() {
    stroke(250,0,0);
    strokeWeight(10);
    for (let i = 0; i < this.segments.length-1; i++){
      push();
      line(this.segments[i].x+30*this.direction.x, this.y+30*this.direction.y, this.x+400*this.direction.x, this.y+400*this.direction.y)
      pop();
    }
    push();
    line(this.segments[this.segments.length-1].x+*this.direction.x, this.y+30*this.direction.y, this.x+400*this.direction.x, this.y+400*this.direction.y)
    pop();
  }

  checkAllMirrors() {

  }
  
}

class Mirror {
  constructor(x1,y1,x2,y2){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  display (){
    stroke(100);
    strokeWeight(10);
    line(x1,y1,x2,y2)
  }
}


function mousePressed() {
  laser.pickedUp();
}
function mouseReleased() {
  laser.dragging = false;
  laser.turning = false;
}



function intersectCheck(x1, y1, x2, y2, x3, y3, x4, y4) {
  let p = createVector(x1,y1); 
  let q = createVector(x3,y3); 
  let r = createVector(x2-x1,y2-y1); 
  let s = createVector(x4-x3,y4-y3); 
  let denom = p5.Vector.cross(r, s).mag();
  let diff = p5.Vector.sub(q, p);
   
  if (p5.Vector.cross(r, s).mag() == 0){

    if (diff.cross(r).mag() == 0){
      console.log('collinear')
      return null
    }
     console.log('parallel')
    return null
  }
  
  let t = diff.cross(s).mag()/denom
  let u = diff.cross(r).mag()/denom

  if (t > 0 && t < 1 && u > 0 && u < 1){
    return (p5.Vector.add(p, p5.Vector.mult(r, t)  ))
  }
  return null
}
