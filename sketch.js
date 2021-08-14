var player, playerImage;
var bg, bgImage
var coin, coinImg;
var score = 0;
var gameState = "play"
function preload(){
  playerImage = loadImage("images/character1.png");
  bgImage = loadImage("images/bg.png");
  coinImage = loadImage("images/coin.png");
  obstacle1 = loadImage("images/obstacle1.png")
  obstacle2 = loadImage("images/obstacle2.png")
  resetButton = loadImage("images/restart.png")
}


function setup(){
  createCanvas(windowWidth,windowHeight);
  background = createSprite(width/2,height/2);
  background.addImage(bgImage);
  background.scale = 2;
  player = createSprite(width/8,height);
  player.addImage(playerImage);
  player.scale = 0.5;
  edges = createEdgeSprites();
  background.velocityX = -2
  coinGroup = new Group();
  obstaclesGroup = new Group();
  reset = createSprite(windowWidth/2,windowHeight/8);
  reset.visible = false;
  reset.addImage(resetButton);
}


function draw(){
  drawSprites();
  textSize(30)
  fill("lightblue");
  text("Coin count:"+ score,width-200,30);
  if(gameState === "play"){  
    spawnCoins();
    spawnObstacles();
    if (keyDown(UP_ARROW)){
      player.y -= 10;
      }
      if(keyDown(DOWN_ARROW)){
        player.y += 10;
      }
      player.collide(edges[2])
player.collide(edges[3])
if(background.x<width/4){
  background.x = width/2;
}
  for(var i = 0; i< coinGroup.length; i++){
    if(coinGroup.get(i).isTouching(player)){
      coinGroup.get(i).destroy();
      score ++;
    }}
  
    if(obstaclesGroup.isTouching(player)){
      player.visible = false;
     gameState = "end";
  
    }
  

  }else if(gameState === "end"){
    text("Game Over!",width/2,height/2);
    background.velocityX = 0;
    coinGroup.destroyEach();
    obstaclesGroup.destroyEach();
    reset.visible = true;
    if(mousePressedOver(reset)){
      resetGame();
    }
  }



  }


function spawnCoins(){
  if (frameCount % 180 === 0){
    var coin = createSprite(width,100);
    coin.scale = 0.5;
    coin.addImage(coinImage);
    coin.y = Math.round(random(50,200));
    coin.velocityX = -3;
    coin.lifetime = width/3;
    coinGroup.add(coin);
  }
}
function spawnObstacles(){
  if(frameCount % 180 === 0){
var obstacles = createSprite(width,100);
var rand= Math.round(random(1,2))
switch(rand){
  case 1: obstacles.addImage(obstacle1);
  break;
  case 2: obstacles.addImage(obstacle2);
  break;
  default: break;
}
obstacles.scale = 0.5;
obstacles.y = Math.round(random(50,500));
obstacles.velocityX = -5;
obstacles.lifetime = width/3;
obstaclesGroup.add(obstacles);
  }
  
}

function resetGame(){
player.visible = true;
gameState = "play"
reset.visible = false;
background.velocityX = -2;

}