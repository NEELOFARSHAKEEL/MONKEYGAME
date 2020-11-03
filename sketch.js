 var PLAY = 1;
  var END = 0;
  var gameState = "SERVE";
  var gameState = PLAY;
  var score=0;
  var survivalTime=0;
  var BananasCollected=0;
var player,playerImage, player_running, player_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score;
 //var finish;
var restart, restartImage;
var BG;
var jumpSound,gameOverSound,eatingSound;
function preload(){
  
  
playerImage =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
   //player_collided = loadAnimation("sprite1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage= loadImage("obstacle.png");
  finishImage =loadImage("textGameOver_1.png");
  restartImage = loadImage("restart.png");
   BGImage = loadAnimation("BG.png");
 //playerImage = loadImage("sprite_0.png");
  
   jumpSound = loadSound("jumpsound.mp3");
   eatingSound = loadSound("energyRecharge.mp3");
   gameOverSound = loadSound("gameOverSound.mp3");
}



function setup() {
     createCanvas(400,400);
  

   //monkey
   player = createSprite(80, 315,20,20);
  player.addAnimation("player",playerImage);
   player.scale=0.10;

  finish=createSprite(200,200,100,50);
  finish.addImage("textGameOver",finishImage);
  finish.scale=1;
  //restart icon);
  restart=createSprite(190,265,10,10);
  restart.addImage("restart",restartImage);
  
  //ground
   ground = createSprite(200, 350,400,10);
  ground.shapeColor="black";

  //groups
   FoodGroup=createGroup();
   EnemyGroup=createGroup();
 
  //points
   survivalTime=0;
  //background
    BG = createSprite(210,270,100,100);
    BG.addAnimation("BG",BGImage);
    BG.scale=4.5;
   BG.velocityX=0;
}


function draw() {

    
    //background
    background("lightblue");
    
    
         
     //if ((BG.x < 200)){
         //BG.x = BG.width/2;
         
        
      

   
   //colliding
    player.collide(ground);
    
    //game state is in play
    
    
      
    if (gameState === PLAY){
      //it means that the game over and restart icon will not be visible for whole game
      restart.visible=false;
      finish.visible=false;
      player.visible=true;
      BG.visible=true;
      //BG.velocityX=-2;
      
       stroke("white");
        textSize(15);
      fill("blue");
      text("Game is loading!! please wait...",20,50);
      
      
     
     
    
    //animation of monkey
      
      
      //to makesure that banana and stone is visible in our game
      spawnBananas();
      spawnEnemies();
      
      //when space key is pressed the monkey will jump
      if(keyDown("space")&& player.y >= 305){
       player.velocityY=-18;
      jumpSound.play(); //playSound("sound://category_jump/arcade_game_jump_18.mp3", false);
       
       }
       
       //gravity to make our monkey jump
      player.velocityY=player.velocityY+1;
       //to text score in our game
      stroke("black");
      textSize(20);
      fill("black");
      //survivalTime=Math.ceil(frameCount/frameRate());
      text("Score = "+score,295,30);
      
      
       stroke("black");
      textSize(20);
      fill("black");
      survivalTime=Math.ceil(frameCount/frameRate());
      
      
      //if monkey is touching banana then it get destroyed
      if (player.isTouching(FoodGroup)){
 eatingSound.play();
        
        FoodGroup.destroyEach();
        survivalTime=survivalTime+10;
        score=score+2;
        BananasCollected = BananasCollected+1;
      }
       
       //if monkey is touching stone then game state = end
      if(player.isTouching(EnemyGroup)){
         gameOverSound.play();
         gameState=END;
         
       }
      
      //game state = END
    }else if(gameState === END){
      finish.visible =true;
       restart.visible =true;
       BG.visible=false;
      player.visible=false;
       restart.addAnimation("restart");
       //to text our points
       stroke("black");
      textSize(20);
      fill("black");
      text("Survival Time : "+survivalTime,100,50);
      text("Bananas collected ="+BananasCollected,120,120);
      //groups that are getting destroyed
      EnemyGroup.destroyEach();
      FoodGroup.destroyEach();
      
      //groups that dont have velocity in end state
      EnemyGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      
      //in end state thr restart icon and game over will be visible
      restart.visible=true;
      finish.visible=true;
      
      //in end state the monkey will become stop
      //player.addAnimation("player",playerImage);
      
      //the restart icon will work when it is pressed
      if(mousePressedOver(restart)){
        reset();
      }
    }
    
    drawSprites();
  }
  
  function spawnBananas(){
    
    //the frame count of banana
    if (frameCount % 80 === 0) {
       
       //banana
      banana = createSprite(600,250,40,10);
      banana.y = random(120,200);    
      banana.velocityX = -5;
      
      //assign lifetime to the variable
      banana.lifetime = 500;
      player.depth = banana.depth + 1;
      
      //add image of banana
      banana.addImage("banana",bananaImage);
      banana.scale=0.05;
      
      
      
      //add each banana to the group
      FoodGroup.add(banana);
      
     }
  }
  
  function spawnEnemies(){
    
    //frame count
    if(World.frameCount%80===0){
      
      //stone
      obstacle = createSprite(430, 318);
      obstacle.addImage("obstacle",obstacleImage);
      obstacle.scale=0.15;
      
      //lifetime of stone
      obstacle.lifetime=500;
      
      //velocity of stone
      obstacle.velocityX=-5;
      
      //ai of obstacle
      obstacle.setCollider("circle",0,0,130);
  
      EnemyGroup.add(obstacle);
      
   }
  }
  function reset(){
        
        gameState=PLAY;
        score=0;
        
        
       
    
  }
  
  





