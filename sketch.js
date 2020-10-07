var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running,monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var invisibleGround ,ground,groundImage
var gameOver, restart;
var score
var edges

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided=loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage=loadImage("ground2.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  
}



function setup() {
  createCanvas(400,400);
   edges=createEdgeSprites();
  monkey=createSprite(50,360);
  monkey.addAnimation("monkey1",monkey_running);
  monkey.addAnimation("collide", monkey_collided);
  monkey.scale=0.1;
  
  ground=createSprite(0,390,400,20);
  ground.addImage("ground1",groundImage);
  ground.scale=1;
  
  obstacleGroup= new Group();
  bannanaGroup=new Group();
  
  gameOver = createSprite(200,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(200,140);
  restart.addImage(restartImg);
  
   
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  score = 0;
  
  
  

   
}
 

function draw() {
  background("white");
  textSize(15);
  text("score=" +score,300,50);
 
  
  if(gameState===PLAY){
  
   score = score + Math.round(getFrameRate()/60);  
     ground.velocityX = -(6 + 3*score/100);
  
    
  if(keyDown("space") && monkey.y >=369.3){
   monkey.velocityY=-15;
    }
  ground.velocityX=-3;
  
  //console.log(monkey.y);
  
  monkey.velocityY=monkey.velocityY+0.8; 
  
  if(ground.x < 0){
   ground.x=ground.width/2; 
  }
  if(bannanaGroup.isTouching(monkey)){
    bannanaGroup.destroyEach();
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  }
  
 
  monkey.collide(edges[3]);
   bannanas();
   obstacles();
  }
  else if(gameState===END){
    gameOver.visible = true;
    restart.visible = true;
    
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    
    
    monkey.changeAnimation("collide", monkey_collided);
    
    obstacleGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
    
  }
  drawSprites();
 

  
}
function bannanas (){
if(frameCount%80===0){
  var bannana= createSprite(400,370);
  bannana.scale=0.1;
  bannana.addImage("bannana1",bananaImage);
  bannana.velocityX=-4;
  bannana.lifeTime=100;
  bannana.y=Math.round(300,320);
  bannanaGroup.add(bannana);
  
}
}
function obstacles(){
  if(frameCount%300===0){
    var obsta =createSprite(400,370);
    obsta.scale=0.1;
    obsta.addImage("obsta1",obstacleImage);
    obsta.velocityX=-4;
    obsta.lifeTime=100;
    obsta.y = Math.round(380,400);
    obstacleGroup.add(obsta);

  }

  }

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
 
   monkey.changeAnimation("monkey1",monkey_running);
 
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}



