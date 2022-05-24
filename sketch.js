
let radius, center, testAngle;
const playerWidth = 200,
    playerHeight = 50;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight-1);
    radius = Math.min(width, height)*0.45
    center = createVector(width/2, height/2)
    testAngle = 0
}
  
function draw() {
    background(220);
    noFill()
    circle(center.x, center.y, radius*2)
    testAngle+= 0.01
    push()
    translate(center)
    rotate(testAngle)
    rect(-playerWidth/2, -radius - playerHeight/2, playerWidth, playerHeight)
    rect(-playerWidth/2, radius - playerHeight/2, playerWidth, playerHeight)
    pop()
}