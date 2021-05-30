var bg, tower,cimg, climg,ghost, gimg;
var gameState ="play";


function preload(){
  towerimg=loadImage("tower.png");
  cimg=loadImage("door.png");
  climg=loadImage("climber.png");
  gimg=loadImage("ghost-jumping.png");
}

function setup(){
  createCanvas(800, 800);

  
  bg=createSprite(400, 400, 1000, 800);
  bg.addImage("t", towerimg);
  bg.scale=1.2
  
  ghost=createSprite(150, 700, 10, 10);
  ghost.addImage("g", gimg);
  ghost.scale=0.5;
  
  cg=new Group()
  dg=new Group()

}

function draw(){
  drawSprites();
  if(gameState==="play"){
  bg.velocityY=5;
  if(bg.y>800){
    bg.y=400
  }
  spawnClimbers();
  if(keyDown("space")){
    ghost.velocityY=-3;
  }
  
  ghost.velocityY=ghost.velocityY+0.5;
    if(ghost.isTouching(cg)||ghost.y>800){
      gameState="end"
    }
    
    if(keyDown("LEFT_ARROW")){
      ghost.x = ghost.x+-3;  
    }
    
    if(keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x+3;  
    }
  }
  
  else if(gameState==="end"){
    reset();
  }
}

function spawnClimbers(){
  if(frameCount%240===0){
    var door=createSprite(50, 10, 10, 10);
    door.x=Math.round(random(50, 750))
    door.velocityY=3;
    door.addImage("c", cimg);
    var climber=createSprite(door.x, 75, 10, 10);
    climber.addImage("cl", climg);
    climber.velocityY=3;
    cg.add(climber);
    dg.add(door)
  }
} 

function reset(){
  cg.destroyEach();
  dg.destroyEach();
  textSize(50);
  fill("yellow");
  text("Game over", 280, 400);
  bg.velocityY=0;
}

