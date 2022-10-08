//module names
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

let center = Matter.Vector.create(window.innerWidth/2, window.innerHeight/2);
let orbitRadius = Math.min(window.innerHeight, window.innerWidth)/2 - 50;
let ballRadius = 10;
let paddleLength = 400;
let ballMass = 10;
let ballStartForce = 0.1;
let constraintLength = Math.sqrt(Math.pow(orbitRadius,2) + 0.25 * Math.pow(paddleLength,2));
console.log(constraintLength);
let type = "line"

// create an engine
var engine = Engine.create();
engine.gravity.scale = 0;

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine//,
    // options: {
    //     width: width,
    //     height: height,
    //     background: 'transparent',
    //     wireframes: false,
    //     showAngleIndicator: false
    // }
});
render.canvas.width = window.innerWidth;
render.canvas.height = window.innerHeight;

// defines objects in scene
var paddle1 = Bodies.rectangle(0, 0, 20, paddleLength);
var paddle1constraint1 = Matter.Constraint.create({
    pointA: center, bodyB: paddle1,
    pointB: Matter.Vector.create(0, -paddleLength/2),
    length: constraintLength,
    render: {type: type}, 
    stiffness: 0.8
});
var paddle1constraint2 = Matter.Constraint.create({
    pointA: center, bodyB: paddle1,
    pointB: Matter.Vector.create(0, paddleLength/2),
    length: constraintLength,
    render: {type: type},
    stiffness: 0.8
});
var paddle2 = Bodies.rectangle(0, 0, 20, paddleLength);
var paddle2constraint1 = Matter.Constraint.create({
    pointA: center, bodyB: paddle2,
    pointB: Matter.Vector.create(0, -paddleLength/2),
    length: constraintLength,
    render: {type: type},
    stiffness: 0.8
});
var paddle2constraint2 = Matter.Constraint.create({
    pointA: center, bodyB: paddle2,
    pointB: Matter.Vector.create(0, paddleLength/2),
    length: constraintLength,
    render: {type: type},
    stiffness: 0.8
});
var ball = Bodies.circle(0, 0, ballRadius, {restitution: 1.05, friction: 0, frictionAir: 0, mass: ballMass});

// // add all of the bodies to the world
var bodies = [paddle1,
            paddle2,
            // paddle1constraint1,
            // paddle1constraint2,
            // paddle2constraint1,
            // paddle2constraint2,
            ball
    ];
Composite.add(engine.world, bodies);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

function start(){
    //freeze everything
    bodies.forEach(function(body) {
        Matter.Body.setAngularVelocity(body, 0);
        Matter.Body.setVelocity(body, Matter.Vector.create(0,0));
    });

    //move everything
    Matter.Body.setPosition(paddle1, Matter.Vector.create(center.x + orbitRadius, center.y));
    paddle1.angle = 0;
    Matter.Body.setPosition(paddle2, Matter.Vector.create(center.x - orbitRadius, center.y));
    paddle2.angle = 0;
    Matter.Body.setPosition(ball, center);

    //freeze everything
    bodies.forEach(function(body) {
        Matter.Body.setAngularVelocity(body, 0);
        Matter.Body.setVelocity(body, Matter.Vector.create(0,0));
    });
    
    console.log("velocity nutralized");

    var initialForce = createVectorWitMagnitude(ballStartForce);
    Matter.Body.applyForce(ball, center, initialForce);
    console.log("force applied");

    //start game loop
    window.requestAnimationFrame(gameloop);
}
start();

function gameloop(){
    if (offScreen()){
        start();
    }

    //continue loop
    window.requestAnimationFrame(gameloop);
}

function createVectorWitMagnitude(magnitude){
    var x = Math.random()*magnitude*2-(magnitude) //[-magnitude,magnitude]
    var yDirection = Math.random() < 0.5 ? -1 : 1 //randomly is negative or positive
    var y = Math.sqrt(Math.pow(magnitude,2) - Math.pow(x,2)) * yDirection//completes a^2+b^2=c^2
    return Matter.Vector.create(x, y);
}

function offScreen(){
    if(ball.position.x <  -ballRadius || //left wall
        ball.position.x > window.innerWidth + ballRadius || //right wall
        ball.position.y <  -ballRadius ||
        ball.position.y > window.innerHeight + ballRadius){
        gameStarted = false
        return true;
    }
    return false;
}