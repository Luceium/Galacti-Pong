const playerWidth = 200,
    playerHeight = 50,
    spinSpeed = 1,
    ballDiam = 40;

let radius, screenCenter,ballX, ballY, xVel, yVel, p1angle, p2angle, gameStarted;
let multiplayer = true,
    masterVel = 3;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight-1);
    radius = Math.min(width, height)*0.45
    screenCenter = createVector(width/2, height/2)
    angleMode(DEGREES)

    gameStarted = false
    fill('#FFFFFF')
    textSize(100)
    strokeWeight(20)
    stroke(51)
    text('Press\nSPACE\nto start', width/2-150, height/2+100)
    
    ballX = 0
    ballY = 0
    xVel = Math.random()*masterVel*2-(masterVel) //[-masterVel,masterVel]
    var yDirection = Math.random() < 0.5 ? -1 : 1 //randomly is negative or positive
    yVel = Math.sqrt(Math.pow(masterVel,2) - Math.pow(xVel,2)) * yDirection//completes a^2+b^2=c^2

    p1angle = 90
    p2angle = 90
}
  
function draw() {
    if(gameStarted){
        clear()
        translate(screenCenter)
        push()
        noFill()
        circle(0, 0, radius*2)
        pop()
        controls()
        drawPlayers()
        drawBall()
        if(offScreen()){
            setup()
        }
    }
}

function keyPressed(){ // start game
    if (keyIsDown(32)){
        gameStarted = true
    }
}

function drawBall(){
    ballX+=xVel
    ballY+=yVel
    circle(ballX, ballY, ballDiam)
}

//checks if the ball is offscreen
function offScreen(){
    const ballOutWidth = (width + ballDiam)/2
    const ballOutHeight = (height + ballDiam)/2
    if(ballX <  -ballOutWidth || ballX > ballOutWidth){
        return true
    } else if(ballY <  -ballOutHeight || ballY > ballOutHeight) {
        return true
    } else {
        return false
    }
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