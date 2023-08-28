function setup() {
    createCanvas(400, 400);
}
  
let collider1 = new RectangleCollider([30, 20], [55, 55]);
let collider2 = new RectangleCollider([25, 20], [32, 34]);

function draw() {
    background(51);
    collider1.p5DebugDraw();
    collider2.p5DebugDraw();
    collider1.collideCalc(collider2, true);
    console.log(`
        up: ${ collider1.hitTopFace() }
        down: ${ collider1.hitUnderFace() }
        left: ${ collider1.hitLeftFace() }
        right: ${ collider1.hitRightFace() }
    `);
}