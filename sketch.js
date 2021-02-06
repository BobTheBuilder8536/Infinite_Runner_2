var mario, marioAni, marioJump;
var ground, groundI, jumpGround;

var lose, loseI;
var logo, logoI;

var wall, wallI, wallG;
var pipe, pipeI, pipeG;

var cameraPosX = 500;
var deathPos = 0;

var randNo;
var score = 0;
var gameState = "start";

function preload() {

  marioAni = loadAnimation("mario.gif");
  marioJump = loadAnimation("mario_jump.png");

  loseI = loadAnimation("mario_lose.gif");
  logoI = loadImage("logo.png");

  groundI = loadImage("ground.png");

  wallI = loadImage("brick.png");
  pipeI = loadImage("pipe.png");
}

function setup() {
  createCanvas(1000, 300);

  wallG = new Group();
  pipeG = new Group();

  ground = createSprite(1000, 290);
  ground.addImage("ground", groundI);
//   ground.velocityX = -5;
  jumpGround = createSprite(ground.x, ground.y - 3, ground.width, ground.height);
  jumpGround.visible = false;
  // jumpGround.debug = true;
  //ground.debug = true;

  mario = createSprite(cameraPosX-400, 200);
  mario.addAnimation("run", marioAni);
  mario.addAnimation("jump", marioJump);
  mario.scale = 0.35;
  mario.velocityY = 5;
  mario.setCollider("circle", 0, 0, 70);
  //mario.debug = true;

  lose = createSprite(500, 100);
  lose.addAnimation("lose", loseI);
  lose.scale = 0.75;
  lose.velocityX = 5;
  lose.visible = false;

  logo = createSprite(500, 125);
  logo.addImage("logo", logoI);
  logo.velocityX = 5;
  logo.visible = false;
}

function draw() {
  background("lightblue");

  drawSprites();

  if (gameState === "start") {
    logo.visible = true;

    textSize(35);
    fill("white");
    stroke("orange");
    strokeWeight(3);
    text("Press 'space' to start", cameraPosX - 170, 250);

    if (keyDown("space")) {
      logo.visible = false;
      gameState = "play";
    }
  }

  if (gameState === "play") {
    score += Math.round(frameRate() / 60);

    if (wallG.isTouching(mario)) {
      jumpGround.y = mario.y + 29;
    }
    if (ground.isTouching(mario)) {
      jumpGround.y = ground.y - 3;
    }

    if (keyDown("space") && jumpGround.isTouching(mario)) {
      mario.velocityY = -8;
      mario.changeAnimation("jump", marioJump);
    }

    if (mario.isTouching(ground) || wallG.isTouching(mario)) {
      mario.changeAnimation("run", marioAni);
    }


    defeat();
    spawnLevel();
  }

  if (gameState === "end") {
    mario.visible = false;
    lose.visible = true;

    if(cameraPosX >= deathPos + 900){
      
          textSize(35);
          fill("white");
          stroke("orange");
          strokeWeight(3);
          text("Press 'R' to reset", cameraPosX - 150, 250);
      
          if (keyDown("r")) {
            score = 0;
            mario.visible = true;
            mario.changeAnimation("run", marioAni);
            gameState = "start";
            lose.visible = false;
          }
    }
  }

  if(cameraPosX % 500 === 0 && cameraPosX != 500){
    ground.x += 500;
} 
  jumpGround.x = ground.x;

  textSize(20);
  fill("white");
  stroke("orange");
  strokeWeight(3);
  text("Score : " + score, cameraPosX + 370, 30);

  mario.velocityY += 0.5;

  mario.collide(ground);
  mario.collide(wallG);

  mario.velocityX = 0;
  mario.x = cameraPosX - 400;
  camera.position.x = cameraPosX;
  cameraPosX += 5;

  logo.depth += 1;
  lose.depth += 1;
}

function defeat() {
  if (pipeG.isTouching(mario)) {
    deathPos = cameraPosX;
    gameState = "end";
  }
}

function spawnLevel() {
  if (cameraPosX % 1000 === 0) {
    randNo = Math.round(random(1, 4));

    switch (randNo) {
      case 1:
        course1();
        break;
      case 2:
        course2();
        break;
      case 3:
        course3();
        break;
      default:
        break;
    }
  }
}

function course1() {
  for (i = cameraPosX + 540; i <= cameraPosX + 560 ; i += 20) {
    pipe = createSprite(i, 270);
    pipe.addImage("plant", pipeI);
    pipe.scale = 0.15;
    pipe.scale = 0.07;
    pipe.lifetime = 300;
    pipeG.add(pipe);
  }
  for (i = cameraPosX + 540; i <= cameraPosX + 560; i += 20) {
    wall = createSprite(i, 150);
    wall.addImage("wall", wallI);
    wall.scale = 0.15;
    wall.lifetime = 300;
    wallG.add(wall);
  }
  for (i = cameraPosX + 640; i <= cameraPosX + 720; i += 20) {
    wall = createSprite(i, 200);
    wall.addImage("wall", wallI);
    wall.scale = 0.15;
    wall.lifetime = 300;
    wallG.add(wall);
  }
  for (i = cameraPosX + 740; i <= cameraPosX + 740; i += 20) {
    pipe = createSprite(i, 200);
    pipe.addImage("plant", pipeI);
    pipe.scale = 0.15;
    pipe.scale = 0.07;
    pipe.lifetime = 300;
    pipe.mirrorY(-1);
    pipeG.add(pipe);
  }
  for (i = cameraPosX + 820; i <= cameraPosX + 880; i += 20) {
    wall = createSprite(i, 270);
    wall.addImage("wall", wallI);
    wall.scale = 0.15;
    wall.lifetime = 300;
    wallG.add(wall);
  }
  for (i = cameraPosX + 1000; i <= cameraPosX + 1000; i += 20) {
    pipe = createSprite(i, 280);
    pipe.addImage("plant", pipeI);
    pipe.scale = 0.15;
    pipe.lifetime = 300;
    pipe.scale = 0.07;
    pipeG.add(pipe);
  }
}

function course2() {
  for (i = cameraPosX + 540; i <= cameraPosX + 620; i += 20) {
    wall = createSprite(i, 270);
    wall.addImage("wall", wallI);
    wall.scale = 0.15;
    wall.lifetime = 300;
    wallG.add(wall);
  }
  for (i = cameraPosX + 560; i <= cameraPosX + 620; i += 20) {
    wall = createSprite(i, 250);
    wall.addImage("wall", wallI);
    wall.scale = 0.15;
    wall.lifetime = 300;
    wallG.add(wall);
  }
  for (i = cameraPosX + 580; i <= cameraPosX + 620; i += 20) {
    wall = createSprite(i, 230);
    wall.addImage("wall", wallI);
    wall.scale = 0.15;
    wall.lifetime = 300;
    wallG.add(wall);
  }
  for (i = cameraPosX + 600; i <= cameraPosX + 620; i += 20) {
    wall = createSprite(i, 210);
    wall.addImage("wall", wallI);
    wall.scale = 0.15;
    wall.lifetime = 300;
    wallG.add(wall);
  }
  for (i = cameraPosX + 620; i <= cameraPosX + 680; i += 20) {
    wall = createSprite(i, 190);
    wall.addImage("wall", wallI);
    wall.scale = 0.15;
    wall.lifetime = 300;
    wallG.add(wall);
  }
  
  for (i = cameraPosX + 800; i <= cameraPosX + 980; i += 20) {
    wall = createSprite(i, 150);
    wall.addImage("wall", wallI);
    wall.scale = 0.15;
    wall.lifetime = 300;
    wallG.add(wall);
  }
  for (i = cameraPosX + 900; i <= cameraPosX + 900; i += 20) {
    pipe = createSprite(i, 130);
    pipe.addImage("plant", pipeI);
    pipe.scale = 0.15;
    pipe.scale = 0.07;
    pipe.lifetime = 300;
    pipeG.add(pipe);
  }
  for (i = cameraPosX + 880; i <= cameraPosX + 880; i += 20) {
    pipe = createSprite(i, 280);
    pipe.addImage("plant", pipeI);
    pipe.scale = 0.15;
    pipe.scale = 0.07;
    pipe.lifetime = 300;
    pipeG.add(pipe);
  }
  for (i = cameraPosX + 960; i <= cameraPosX + 960; i += 20) {
    pipe = createSprite(i, 180);
    pipe.addImage("plant", pipeI);
    pipe.scale = 0.15;
    pipe.scale = 0.07;
    pipe.lifetime = 300;
    pipe.mirrorY(-1);
    pipeG.add(pipe);
  }
  for (i = cameraPosX + 980; i <= cameraPosX + 1000; i += 20) {
    wall = createSprite(i, 170);
    wall.addImage("wall", wallI);
    wall.scale = 0.15;
    wall.lifetime = 300;
    wallG.add(wall);
  }
  for (i = cameraPosX + 980; i <= cameraPosX + 1020; i += 20) {
    wall = createSprite(i, 190);
    wall.addImage("wall", wallI);
    wall.scale = 0.15;
    wall.lifetime = 300;
    wallG.add(wall);
  }
  for (i = cameraPosX + 1000; i <= cameraPosX + 1040; i += 20) {
    wall = createSprite(i, 210);
    wall.addImage("wall", wallI);
    wall.scale = 0.15;
    wall.lifetime = 300;
    wallG.add(wall);
  }
}


function course3() {
  for (i = cameraPosX + 540; i < cameraPosX + 640; i += 20) {
    wall = createSprite(i, 270);
    wall.addImage("wall", wallI);
    wall.scale = 0.15;
    wall.lifetime = 300;
    wallG.add(wall);
  }
  for (i = cameraPosX + 640; i <= cameraPosX + 640; i += 20) {
    pipe = createSprite(i, 250);
    pipe.addImage("plant", pipeI);
    pipe.scale = 0.15;
    pipe.scale = 0.07;
    pipe.lifetime = 300;
    pipeG.add(pipe);
  }
  for (i = cameraPosX + 680; i < cameraPosX + 800; i += 20) {
    wall = createSprite(i, 240);
    wall.addImage("wall", wallI);
    wall.scale = 0.15;
    wall.lifetime = 300;
    wallG.add(wall);
  }
  for (i = cameraPosX + 800; i <= cameraPosX + 800; i += 20) {
    pipe = createSprite(i, 220);
    pipe.addImage("plant", pipeI);
    pipe.scale = 0.15;
    pipe.scale = 0.07;
    pipe.lifetime = 300;
    pipeG.add(pipe);
  }
  for (i = cameraPosX + 860; i < cameraPosX + 960; i += 20) {
    wall = createSprite(i, 120);
    wall.addImage("wall", wallI);
    wall.scale = 0.15;
    wall.lifetime = 300;
    wallG.add(wall);
  }
  for (i = cameraPosX + 980; i <= cameraPosX + 980; i += 20) {
    pipe = createSprite(i, 270);
    pipe.addImage("plant", pipeI);
    pipe.scale = 0.15;
    pipe.scale = 0.07;
    pipe.lifetime = 300;
    pipeG.add(pipe);
  }
}