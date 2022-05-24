const playerWidth = 200,
    playerHeight = 50,
    spinSpeed = 1,
    ballDiam = 40;

let radius, screenCenter, masterVel, xVel, yVel;
let p1angle = 90,
    p2angle = 90,
    multiplayer = true,
    ballX = 0,
    ballY = 0;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight-1);
    radius = Math.min(width, height)*0.45
    screenCenter = createVector(width/2, height/2)
    angleMode(DEGREES)
}
  
function draw() {
    clear()
    translate(screenCenter)
    push()
    noFill()
    circle(0, 0, radius*2)
    pop()
    controls()
    drawPlayers()
    drawBall()
}

function drawBall(){
    circle(ballX, ballY, ballDiam)
}

function bounce(){

}

function drawPlayers(){
    push()
    rotate(p1angle)
    rect(-playerWidth/2, -radius - playerHeight/2, playerWidth, playerHeight)
    pop()
    push()
    rotate(p2angle)
    rect(-playerWidth/2, radius - playerHeight/2, playerWidth, playerHeight)
    pop()
}

function controls(){
    if (keyIsDown(RIGHT_ARROW)){
        p1angle += spinSpeed
    }
    if (keyIsDown(LEFT_ARROW)){
        p1angle -= spinSpeed
    }
    if (keyIsDown(65) && multiplayer){
        p2angle -= spinSpeed
    }
    if (keyIsDown(68) && multiplayer){
        p2angle += spinSpeed
    }
}