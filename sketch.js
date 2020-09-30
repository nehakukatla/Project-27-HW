
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const Render = Matter.Render;

var world, engine, tree, ground, stone, boy, launcher; 
var mango1, mango2, mango3, mango4, mango5;
var launchingForce=100;

function preload()
{
	boyimg = loadImage("boy.png")
}

function setup() {
	createCanvas(800, 700);

	engine = Engine.create();
	world = engine.world;
	//tree
	tree = new Tree(550,500);
	//ground
	ground = new Ground(400,690,800,20);
	//stone
	stone = new Stone(140,200,30);
	//mangos
	mango1 = new Mango(450,400,40);
	mango2 = new Mango(500,500,35);
	mango3 = new Mango(550,450,30);
	mango4 = new Mango(600,400,45);
	mango5 = new Mango(650,500,30);
	//launcher
	laucher = new Launcher(stone.body, {x:235,y:420});

	var render = Render.create({
		element: document.body,
		engine: engine,
		options: {
		  width: 1300,
		  height: 600,
		  wireframes: false
		}
	  });

	Engine.run(engine);
}


function draw() {
  background(230);
  textSize(25);
  text("Press Space to get another Chance to Play!",50 ,50);
  image(boy,200,340,200,300);
  tree.display();
  stone.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  ground.display();
  launcher.display();
  detectCollision(stone,mango1);
  detectCollision(stone,mango2);
  detectCollision(stone,mango3);
  detectCollision(stone,mango4);
  detectCollision(stone,mango5);

}

function mouseDragged(){
    Matter.Body.setPosition(stone.body,{x:mouseX,y: mouseY});
}

function mouseReleased(){
    launcher.fly();
}

function keyPressed(){
	if(keyCode === 32){
		Matter.Body.setPosition(stone.body,{x:235,y:420});
		launcher.attach(stone.body);
	}
}

function detectCollision(lstone,lmango){
	mangoBodyPosition = lmango.body.Position;
	stoneBodyPosition = lstone.body.Position;
    var distance = dist(stoneBodyPosition.x,stoneBodyPosition.y,mangoBodyPosition.x,mangoBodyPosition.y);
	
	if(distance <= lmango.r+lstone.r){
		Matter.Body.setStatic(lmango.body,false);
	}
}

