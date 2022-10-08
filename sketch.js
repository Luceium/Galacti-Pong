const playerWidth = 200,
    playerHeight = 50,
    spinSpeed = 1,
    ballDiam = 40;

let screenCenter, gameStarted;
let ball, orbit, p1, p2;
let multiplayer = true,
    masterVel = 3
    autoStart = true;

class Player{
    constructor(y, angle=0, width=playerWidth, height=playerHeight){
        this.y = y
        this.orbitalAngle = angle
        this.boxAngle = null
        this.width = width
        this.height = height
    }
    show(){
        push()
        this.x = 
        this.y = 
        translate(this.x, this.y)
        rotate(this.boxAngle)
        rectMode(CENTER)
        rect(0, 0, this.width, this.height)
        pop()
    }
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight-1);
    screenCenter = createVector(width/2, height/2)
    angleMode(DEGREES)
    rectMode(CENTER)

    ball = {
        x: null,
        y: null,
        xVel: null,
        yVel: null,
        move: function() {
            this.x+=this.xVel
            this.y+=this.yVel
            if(offScreen()){
                secondarySetup()
            }
            circle(ball.x, ball.y, ballDiam)
        }
    }
    
    orbit = {
        radius: Math.min(width, height)*0.45,
        show: function() {
            push()
            noFill()
            circle(screenCenter.x, screenCenter.y, this.radius*2)
            pop()
        }
    }

    secondarySetup()
}

function secondarySetup(){
    strokeWeight(20)
    stroke(51)

    if (!autoStart) {
        gameStarted = false
        fill('#FFFFFF')
        textSize(100)
        text('Press\nSPACE\nto start', width/2-150, height/2+100)
    }

    ball.x = screenCenter.x
    ball.y = screenCenter.y
    ball.xVel = Math.random()*masterVel*2-(masterVel) //[-masterVel,masterVel]
    var yDirection = Math.random() < 0.5 ? -1 : 1 //randomly is negative or positive
    ball.yVel = Math.sqrt(Math.pow(masterVel,2) - Math.pow(ball.xVel,2)) * yDirection//completes a^2+b^2=c^2

    p1 = new Player(orbit.radius, -90)
    p2 = new Player(orbit.radius, 90)
}
  
function draw() {
    if(gameStarted || autoStart){
        clear()
        orbit.show()
        controls()
        drawPlayers()
        ball.move()
    }
}

function bounce(){

}

function calcAngleDegrees(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}



function drawPlayers(){
    p1.show()
    p2.show()
}

//checks if the ball is offscreen
function offScreen(){
    if(ball.x <  -ballDiam ||
        ball.x > width + ballDiam ||
        ball.y <  -ballDiam ||
        ball.y > height + ballDiam){
        gameStarted = false
    }
}

function keyPressed(){ // start game
    if (keyIsDown(32)){
        gameStarted = !gameStarted//true
    }
}

function controls(){
    if (keyIsDown(RIGHT_ARROW)){
        p1.orbitalAngle += spinSpeed
    }
    if (keyIsDown(LEFT_ARROW)){
        p1.orbitalAngle -= spinSpeed
    }
    if (keyIsDown(65) && multiplayer){
        p2.orbitalAngle -= spinSpeed
    }
    if (keyIsDown(68) && multiplayer){
        p2.orbitalAngle += spinSpeed
    }
}