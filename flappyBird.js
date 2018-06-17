var cvs = document.getElementById("myCanvas");
var ctx = cvs.getContext("2d");

//load the images

var bird =  new Image();
var bg =  new Image();
var fg =  new Image();
var pipeNorth =  new Image();
var pipeSouth =  new Image();

bird.src = "https://res.cloudinary.com/jjaijg/image/upload/v1529233286/images/bird_da8tvx.png";
bg.src = "https://res.cloudinary.com/jjaijg/image/upload/v1529233248/images/bg_wcs0zv.png";
fg.src = "https://res.cloudinary.com/jjaijg/image/upload/v1529233286/images/fg_c1ojzq.png";
pipeNorth.src = "https://res.cloudinary.com/jjaijg/image/upload/v1529233286/images/pipeNorth.png";
pipeSouth.src = "https://res.cloudinary.com/jjaijg/image/upload/v1529233286/images/pipeSouth.png";

// some variables
var gap = 88;
var constant = pipeNorth.height + gap;

var bX = 10;
var bY = 150;

var gravity = 1.4;

var score = 0;

//audio files
var fly = new Audio();
var scor = new Audio();

fly.src = "http://res.cloudinary.com/jjaijg/video/upload/v1529237457/images/fly.mp3";
scor.src = "http://res.cloudinary.com/jjaijg/video/upload/v1529237469/images/score.mp3";

//on key down

document.addEventListener("keydown", moveUp);

function moveUp() {
  bY -= 28;
  fly.play();
}

// pipe coordiantes

var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0,
}

//draw images

function draw() {
  
	ctx.drawImage(bg,0,0);
  
  for (var i = 0; i < pipe.length; i++) {  
    ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
    ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y + constant); 
    
    pipe[i].x--;
    
    if (pipe[i].x == 125) {
      pipe.push({
        x : cvs.width,
        y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }
    
    // detect collision
    
    if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width
    && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= 
    pipe[i].y+constant) || bY+bird.height >= cvs.height - fg.height) {
      window.location.reload(); //reload page
      //window.location.href = window.location.href;
    }
    
    if (pipe[i].x == 5) {
      score++;
      scor.play();
    }
  }
  
  ctx.drawImage(fg,0,cvs.height - fg.height);
  ctx.drawImage(bird,bX,bY);
  
  bY += gravity;
  
  ctx.fillStyle = "#000";
  ctx.font = "20px verdana";
  ctx.fillText("Score : "+score,10,cvs.height - 20);
  
  requestAnimationFrame(draw);
}

draw();
