let center = Matter.Vector.create(window.innerWidth/2, window.innerHeight/2);
let spooderSize = 100;

// create an engine
var engine = Matter.Engine.create();

// create a renderer
var render = Matter.Render.create({
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

// add mouse control
var mouse = Matter.Mouse.create(render.canvas),
mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

Matter.Composite.add(engine.world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// an example of using mouse events on a mouse
Matter.Events.on(mouseConstraint, 'mousedown', function(event) {
    console.log(event.mouse.position)
    var mousePosition = Matter.Vector.create(event.mouse.position.x, event.mouse.position.y);
    web.pointB = mousePosition;
});

var inertia = 1000;
var spiderBlock = Matter.Bodies.rectangle(500,100, spooderSize, spooderSize, {
    inertia: inertia,
    iverseInertia: 1/inertia
});
var web = Matter.Constraint.create({
    bodyA: spiderBlock,
    pointB: center,
    stiffness: 0.1,
    length: 100,
    render: {type: "spring"}
})

var bodies = [
    spiderBlock,
    web
];
Matter.Composite.add(engine.world, bodies);

// run the renderer
Matter.Render.run(render);

// create runner
var runner = Matter.Runner.create();

// run the engine
Matter.Runner.run(runner, engine);