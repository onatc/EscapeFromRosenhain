var sketchProc=function(processingInstance){ with (processingInstance){
size(1200, 600); 
frameRate(60);


/*
* Programmer: Onat Calik, John Mert
* PID: onatc6, canm7
* Date: 11/2/2018
* Version: 1
* Purpose: Final Project Checkpoint#1
* Reference and Sources: In sprite design, Universal LPC Sprite Sheet was used.
* Sprite Sheet Source: https://github.com/jrconway3/Universal-LPC-spritesheet
* Bat Image: https://opengameart.org/content/bats
*
*/

//////////////////ProgramCodeGoesHere//////////////////////////////////////////
// animating through a series of images
angleMode = "radians";
frameRate(60);

//CHECKPOINT 1
var chr1WalkLeft = [];
var chr1WalkRight = [];
var chr2WalkLeft = [];
var chr2WalkRight = [];


var keyArray = [];

var start_screen = 1;		//1 if showing start screen
var play_screen = 0;		//1 if showing play screen
var instruction_screen = 0;		//1 if showing instruction screen
var singleORmulti = 0; //singleplayer = 0, multiplayer = 1;
var space_released = 0;     // 1 if space is pressed and released
var bossBatImages = [];
bossBatImages.push(loadImage("Sprites/bat/boss_bat_1.png"));
bossBatImages.push(loadImage("Sprites/bat/boss_bat_2.png"));
    
var firedropImage = loadImage("Sprites/firedrop.png");
var fireDropFrame = 0;

var fireDropObj = function(){
	this.x = Math.floor(Math.random() * 1200);
	this.y = -10;
	this.speed = Math.floor(Math.random() * 1) + 1;
	this.currFrame = 0;
};

fireDropObj.prototype.draw = function(){
	image(firedropImage, this.x, this.y, 10, 20);
	if(this.y > 600){
		this.y = - 10;
		this.x = Math.floor(Math.random() * 1200);
	}
	this.y += this.speed;
};
    
var bossBatAnimation = function(x, y){
	this.x = x;
	this.y = y;
	this.i = 0;
	this.currFrame = 0;
};

bossBatAnimation.prototype.draw = function(){
	image(bossBatImages[this.i], this.x, this.y, 300, 250);
	if(this.currFrame >= 10){
		if(this.i === 0){
			this.i = 1;
		}
		else{
			this.i = 0;
		}
		this.currFrame = 0;
	}
	this.currFrame++;
};
var chr1Obj = function(x,y){
	this.x = x;
	this.y = y;
	this.xDir = -1;
	this.i = 1;   //0 = move right, 1 = move left
	this.currFrame = 0;
};

var chr2Obj = function(x, y){
	this.x = x;
	this.y = y;
	this.xDir = 1;
	this.i = 0;		//0 = move right, 1 = move left
	this.currFrame = 0;
};

var chr1Init = function(){
	chr1WalkLeft.push(loadImage("Character1Sprites/walkleft/c1_walk_left_1.png"));
	chr1WalkLeft.push(loadImage("Character1Sprites/walkleft/c1_walk_left_2.png"));
	chr1WalkLeft.push(loadImage("Character1Sprites/walkleft/c1_walk_left_3.png"));
	chr1WalkLeft.push(loadImage("Character1Sprites/walkleft/c1_walk_left_4.png"));
	chr1WalkLeft.push(loadImage("Character1Sprites/walkleft/c1_walk_left_5.png"));
	chr1WalkLeft.push(loadImage("Character1Sprites/walkleft/c1_walk_left_6.png"));
	chr1WalkLeft.push(loadImage("Character1Sprites/walkleft/c1_walk_left_7.png"));
	chr1WalkLeft.push(loadImage("Character1Sprites/walkleft/c1_walk_left_8.png"));
	chr1WalkLeft.push(loadImage("Character1Sprites/walkleft/c1_walk_left_9.png"));
	chr1WalkRight.push(loadImage("Character1Sprites/walkright/c1_walk_right_1.png"));
	chr1WalkRight.push(loadImage("Character1Sprites/walkright/c1_walk_right_2.png"));
	chr1WalkRight.push(loadImage("Character1Sprites/walkright/c1_walk_right_3.png"));
	chr1WalkRight.push(loadImage("Character1Sprites/walkright/c1_walk_right_4.png"));
	chr1WalkRight.push(loadImage("Character1Sprites/walkright/c1_walk_right_5.png"));
	chr1WalkRight.push(loadImage("Character1Sprites/walkright/c1_walk_right_6.png"));
	chr1WalkRight.push(loadImage("Character1Sprites/walkright/c1_walk_right_7.png"));
	chr1WalkRight.push(loadImage("Character1Sprites/walkright/c1_walk_right_8.png"));
	chr1WalkRight.push(loadImage("Character1Sprites/walkright/c1_walk_right_9.png"));
};

var chr2Init = function(){
	chr2WalkLeft.push(loadImage("Character2Sprites/walkleft/c2_walk_left_1.png"));
	chr2WalkLeft.push(loadImage("Character2Sprites/walkleft/c2_walk_left_2.png"));
	chr2WalkLeft.push(loadImage("Character2Sprites/walkleft/c2_walk_left_3.png"));
	chr2WalkLeft.push(loadImage("Character2Sprites/walkleft/c2_walk_left_4.png"));
	chr2WalkLeft.push(loadImage("Character2Sprites/walkleft/c2_walk_left_5.png"));
	chr2WalkLeft.push(loadImage("Character2Sprites/walkleft/c2_walk_left_6.png"));
	chr2WalkLeft.push(loadImage("Character2Sprites/walkleft/c2_walk_left_7.png"));
	chr2WalkLeft.push(loadImage("Character2Sprites/walkleft/c2_walk_left_8.png"));
	chr2WalkLeft.push(loadImage("Character2Sprites/walkleft/c2_walk_left_9.png"));
	chr2WalkRight.push(loadImage("Character2Sprites/walkright/c2_walk_right_1.png"));
	chr2WalkRight.push(loadImage("Character2Sprites/walkright/c2_walk_right_2.png"));
	chr2WalkRight.push(loadImage("Character2Sprites/walkright/c2_walk_right_3.png"));
	chr2WalkRight.push(loadImage("Character2Sprites/walkright/c2_walk_right_4.png"));
	chr2WalkRight.push(loadImage("Character2Sprites/walkright/c2_walk_right_5.png"));
	chr2WalkRight.push(loadImage("Character2Sprites/walkright/c2_walk_right_6.png"));
	chr2WalkRight.push(loadImage("Character2Sprites/walkright/c2_walk_right_7.png"));
	chr2WalkRight.push(loadImage("Character2Sprites/walkright/c2_walk_right_8.png"));
	chr2WalkRight.push(loadImage("Character2Sprites/walkright/c2_walk_right_9.png"));
};

chr1Obj.prototype.draw = function(){
	if(!this.i){
		if(this.currFrame >= 0 && this.currFrame <= 5){
			image(chr1WalkRight[0], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 6 && this.currFrame <= 12){
			image(chr1WalkRight[1], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 13 && this.currFrame <= 19){
			image(chr1WalkRight[2], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 20 && this.currFrame <= 26){
			image(chr1WalkRight[3], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 27 && this.currFrame <= 33){
			image(chr1WalkRight[4], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 34 && this.currFrame <= 40){
			image(chr1WalkRight[5], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 41 && this.currFrame <= 47){
			image(chr1WalkRight[6], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 48 && this.currFrame <= 54){
			image(chr1WalkRight[7], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 55 && this.currFrame <= 60){
			image(chr1WalkRight[8], this.x, this.y, 40, 50);
		}
		this.currFrame++;
		if(this.currFrame > 60){
			this.currFrame = 0;
		}
	}
	else{
		if(this.currFrame >= 0 && this.currFrame <= 5){
			image(chr1WalkLeft[0], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 6 && this.currFrame <= 12){
			image(chr1WalkLeft[1], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 13 && this.currFrame <= 19){
			image(chr1WalkLeft[2], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 20 && this.currFrame <= 26){
			image(chr1WalkLeft[3], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 27 && this.currFrame <= 33){
			image(chr1WalkLeft[4], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 34 && this.currFrame <= 40){
			image(chr1WalkLeft[5], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 41 && this.currFrame <= 47){
			image(chr1WalkLeft[6], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 48 && this.currFrame <= 54){
			image(chr1WalkLeft[7], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 55 && this.currFrame <= 60){
			image(chr1WalkLeft[8], this.x, this.y, 40, 50);
		}
		this.currFrame++;
		if(this.currFrame > 60){
			this.currFrame = 0;
		}
	}
	
	if(this.x >= 1150){
		this.xDir = -this.xDir;
		this.i = 1; //move left now
	}
	
	if(this.x <= 0){
		this.xDir = -this.xDir;
		this.i = 0; //move left now
	}
	this.x+= this.xDir;
};

chr2Obj.prototype.draw = function(){
	if(!this.i){
		if(this.currFrame >= 0 && this.currFrame <= 5){
			image(chr2WalkRight[0], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 6 && this.currFrame <= 12){
			image(chr2WalkRight[1], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 13 && this.currFrame <= 19){
			image(chr2WalkRight[2], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 20 && this.currFrame <= 26){
			image(chr2WalkRight[3], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 27 && this.currFrame <= 33){
			image(chr2WalkRight[4], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 34 && this.currFrame <= 40){
			image(chr2WalkRight[5], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 41 && this.currFrame <= 47){
			image(chr2WalkRight[6], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 48 && this.currFrame <= 54){
			image(chr2WalkRight[7], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 55 && this.currFrame <= 60){
			image(chr2WalkRight[8], this.x, this.y, 40, 50);
		}
		this.currFrame++;
		if(this.currFrame > 60){
			this.currFrame = 0;
		}
	}
	else{
		if(this.currFrame >= 0 && this.currFrame <= 5){
			image(chr2WalkLeft[0], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 6 && this.currFrame <= 12){
			image(chr2WalkLeft[1], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 13 && this.currFrame <= 19){
			image(chr2WalkLeft[2], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 20 && this.currFrame <= 26){
			image(chr2WalkLeft[3], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 27 && this.currFrame <= 33){
			image(chr2WalkLeft[4], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 34 && this.currFrame <= 40){
			image(chr2WalkLeft[5], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 41 && this.currFrame <= 47){
			image(chr2WalkLeft[6], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 48 && this.currFrame <= 54){
			image(chr2WalkLeft[7], this.x, this.y, 40, 50);
		}
		else if(this.currFrame >= 55 && this.currFrame <= 60){
			image(chr2WalkLeft[8], this.x, this.y, 40, 50);
		}
		this.currFrame++;
		if(this.currFrame > 60){
			this.currFrame = 0;
		}
	}
	
	if(this.x >= 1150){
		this.xDir = -this.xDir;
		this.i = 1; //move left now
	}
	
	if(this.x <= 0){
		this.xDir = -this.xDir;
		this.i = 0; //move left now
	}
	this.x+= this.xDir;
};

var hero1 = new chr1Obj(1100,100);
var hero2 = new chr2Obj(100,510);
var bat1Start = new bossBatAnimation(100, 200);
var bat2Start = new bossBatAnimation(800, 200);
bat2Start.i = 1;
    
var fireDrops = [];

//Start screen display
var startScreen = function(){
    fireDropFrame++;
	if(fireDropFrame >= 30 && fireDrops.length < 15){
		fireDrops.push(new fireDropObj());
		fireDropFrame = 0;
	}
    if(space_released){
        singleORmulti = !singleORmulti;
        space_released = 0;
    }
    //Background
    background(27, 27, 28);
    
    //Text 0
    var title = " Escape From       Rosenhain";
    fill(245, 245, 37);
    textSize(40);
    text(title, 450, 150, 300, 400);
    
	//team members
	var team = "     Team Members:  Onat Calik   John Mert";
	fill(255, 255, 255);
    textSize(15);
    text(team, 490, 250, 150, 100);
	
    //Text 1
    var ins = "Right-click for instructions";
    fill(255, 255, 255);
    textSize(15);
    text(ins, 490, 450, 400, 100);
    
    //Text 2
    var play = "Left-click to start";
    fill(255, 255, 255);
    textSize(15);
    text(play, 490, 495, 400, 100);
    
    text("Spacebar to switch modes:", 490, 315, 200, 100);
    var p1 = "Singleplayer";
    var p2 = "Multiplayer";
    text(p1, 490, 360, 400, 100);
    text(p2, 600, 360, 400, 100);
    
    //Switch modes
    if(!singleORmulti){
        fill(255, 0, 0);
        ellipse(480, 365, 15, 15);
    }
    else{
        fill(255, 0, 0);
        ellipse(590, 365, 15, 15);
    }
    
    
};

//Instructions screen display
var instructions = function(){
    
    background(27, 27, 28);
    var title = "Instructions";
    var exp = "*Left - right keys to move.           Shoot with X and use space bar to jump.                       *Destroy enemies and reach to the end to complete the level.";
    textSize(15);
    fill(255, 255, 255);
    textSize(50);
    text(title, 450, 150, 400, 100);
    fill(245, 245, 37);
    textSize(20);
    text(exp, 450, 230, 300, 200);


    //Text 1
    
    var ins = "Right-click to go back to Start Screen";
    fill(255, 255, 255);
    textSize(15);
    text(ins, 450, 430, 400, 100);
    
    //Text 2
    var play = "Left-click to play";
    fill(255, 255, 255);
    textSize(15);
    text(play, 450, 450, 400, 100);

   
};

chr1Init();
chr2Init();
//////////////CHECKPOINT 1 END///////////////////

///CHECKPOINT 2
var snowflakeImage = loadImage("Sprites/snowflake.png");
var snowflakeFrame = 0;

var gameObj = function(){
	this.tileMap = [
	"--------------------------------------------c---------------------------------c------------------",
	"---------c-----------c-------------c----------------c------------c----------------------c--------",
	"-c--------------c------------------------------c------------------------c------------------------",
	"---------------------------c-----d--------c------------------c----------------------c------------",
	"-------c------------c----------a-b---------------------------------------------------------------",
	"-----------------------------ffffff---------------a---c---------------------------c--------------",
	"-------------------------------------------------ffff-------------------------------------B------",
	"--a--------------------ffff----------------------------ff--------d-------------------------------",
	"--ff-----------------------------------------------a-------------b----------------fffff----------",
	"-------a---------gg-----d---ff---d------------d---ff------gggggggggg------d---ff-------d-----h---",
	"-----gggg---g--ggzz-----b--------b-----gg-----b--------gggzzzzzzzzzz------b------ -----b---------",
	"gggggzzzzgggz gzzzzggggggggggggggggggggzzg ggggggggggggzzzzzzzzzzzzzggggggggggggggggggggggggggggg",];
	this.xCor = 0;
	this.level = 1;
};


var game = new gameObj();


var snowflakeObj = function(){
	this.x = Math.floor(Math.random() * 4700) + 1;
	this.y = -10;
	this.speed = Math.floor(Math.random() * 1) + 1;
	this.currFrame = 0;
};

snowflakeObj.prototype.draw = function(){
	image(snowflakeImage, this.x, this.y, 10, 10);
	if(this.y > 600){
		this.y = - 10;
		this.x = Math.floor(Math.random() * 4700) + 1;
	}
	this.y += this.speed;
};
var win = 0;
var lose = 0;
//FORCE
var gravity = new PVector(0, 0.5);
var jumpForce = new PVector(0, -11);


//STORAGE
var archerMovement = []; //[0-8] right, [9-17] left
var archerShoot = []; //[0-12] shoot right, [13-25] shoot left
var batMovement = []; //bat movement animation
var bossBatMovement = [];
var dragMovement = [];
var archerDead = []; //archer die animation
var golemMovement = [];


var batObjects = []; //bats in the map
var arrows = []; //Arrows that are launched
var groundObjects = []; //ground objects
var treeObjects = [];
var cloudObjects = [];
var bossBatObjects = [];
var dragObjects = [];
var ammoObjects = [];
var healthObjects = [];
var fireballObjects = [];
var snowflakes = [];
var golemObjects = [];

//IMAGES
var groundImg = loadImage("Sprites/ground.png");
var heartImage = loadImage("Sprites/heart.png");
var archerHeadImage = loadImage("Sprites/archer_head.png");
var arrowUpImage = loadImage("Sprites/arrow_up.png");
var arrowImg = loadImage("Sprites/arrow.png");
var deadTreeImg = loadImage("Sprites/dead_tree.png");
var caveImg = loadImage("Sprites/CaveEntrance.png");
var cloudImages = [];
var flyingGroundImg = loadImage("Sprites/flying_ground.png");
var dirtGroundImg = loadImage("Sprites/dirt_ground.png");
var fireballImg = loadImage("Sprites/fireball.png");
var voidImages = [];
var stoneGroundImg = loadImage("Sprites/stone.png");
var flyingStoneImg = loadImage("Sprites/flying_stone.png");
var snowImg = loadImage("Sprites/snow.png");
var snowGroundImg = loadImage("Sprites/snow_ground.png");
var flyingSnowImg = loadImage("Sprites/flying_snow.png");
var snowTreeImg = loadImage("Sprites/snow_tree.png");

var collectiblesObj = function(x, y, t){
	this.x = x;
	this.y = y;
	this.type = t;
};

collectiblesObj.prototype.draw = function(){
	if(this.type === 0){
		image(arrowUpImage, this.x, this.y, 20, 35);
	}
	if(this.type === 1){
		image(heartImage, this.x, this.y, 30, 30);
	}
};


var setClouds = function(){
	cloudImages.push(loadImage("Sprites/cloud1.png"));
	cloudImages.push(loadImage("Sprites/cloud2.png"));
	cloudImages.push(loadImage("Sprites/cloud3.png"));
	voidImages.push(loadImage("Sprites/void1.png"));
    voidImages.push(loadImage("Sprites/void2.png"));
    voidImages.push(loadImage("Sprites/void3.png"));
};
var treeObj = function(x, y, t){
	this.x = x;
	this.y = y;
	this.type = t;
};

treeObj.prototype.draw = function(){
	if(this.type === 0){
		image(deadTreeImg, this.x, this.y, 80, 120);
	}
	if(this.type === 1){
		image(snowTreeImg, this.x, this.y - 30, 80, 120);
	}
};

var cloudObj = function(x, y){
	this.x = x;
	this.y = y;
	this.type = Math.floor(Math.random() * 3);
};

cloudObj.prototype.draw = function(){
	if(game.level == 1){
        if(this.type === 0){
            image(cloudImages[0], this.x, this.y, 260, 160);
        }
        if(this.type === 1){
            image(cloudImages[1], this.x, this.y, 260, 160);
        }
        if(this.type === 2){
            image(cloudImages[2], this.x, this.y, 260, 160);
        }
    }
    if(game.level === 2){
        if(this.type === 0){
            image(voidImages[0], this.x, this.y, 260, 160);
        }
        if(this.type === 1){
            image(voidImages[1], this.x, this.y, 260, 160);
        }
        if(this.type === 2){
            image(voidImages[2], this.x, this.y, 260, 160);
        }
    }
	
};


var archerObj = function(x, y){
	this.position = new PVector(x, y);
	this.velocity =  new PVector(0, 0);
	this.acceleration = new PVector(0, 0);
	this.currFrame = 0;	//Current frame for animation timing
	this.moveState = 0;	//Keeps track of movement states, [0-8] move right, [9-17] move left, [18] shoot right, [19] shoot left
	this.facingDir = 1; //Keeps track of the direction the character is facing: 1 for right, -1 for left
	this.jump = 0;		//Keeps track of jump animation, 0 = not jumping
	this.fire = -1;		//Keeps track of fire animation, -1 = not shooting, [0-9] shooting right, [10-19] shooting left
	this.fall = 0;
	this.jumpFrame = 0;
	this.dead = 0;
	this.life = 3;
	this.ammo = 3;
	this.deadState = 0;
	this.rightMovBlocked = 0;//Keeps track of ground objects on the right side of the character
	this.leftMovBlocked = 0;//Keeps track of ground objects on the left side of the character
	
};

var archer = new archerObj(0, 500);

var fireballObj = function(x, y, archerX, archerY){
	this.position = new PVector(x, y);
	this.velocity =  new PVector(0, 0);
	this.acceleration = new PVector(0, 0);
	this.currFrame = 0;
	this.speed = 5;
	this.facing = new PVector(archerX, archerY); //0 = right, 1 = left
	this.initialized = 0;
	this.angle = 0;
};

fireballObj.prototype.draw = function(){
	pushMatrix();
	translate(this.position.x, this.position.y);
	rotate(this.angle);
	this.angle += Math.PI / 45;
	if(this.angle > 2* Math.PI){
		this.angle = 0;
	}
	image(fireballImg, 0, 0, 30, 30);
	popMatrix();
};

fireballObj.prototype.move = function(){
	this.draw();
	if(!this.initialized){
		if(this.position.x - this.facing.x < 0){
			this.velocity.x = -(this.position.x - this.facing.x) / 200;
		}
		else if(this.position.x - this.facing.x === 0){
			this.velocity.x = 0;
		}
		else if(this.position.x - this.facing.x > 0){
			this.velocity.x = -((this.position.x - this.facing.x)/ 200);
		}
		
		if(this.position.y - this.facing.y < 0){
			this.velocity.y = -(this.position.y - this.facing.y) / 200;
		}
		else if(this.position.y - this.facing.y=== 0){
			this.velocity.y = 0;
		}
		else if(this.position.x - this.facing.x > 0){
			this.velocity.y = -((this.position.y - this.facing.y) / 200);
		}
		this.initialized = 1;
	}
	this.position.add(this.velocity);
	this.currFrame++;
	if(dist(this.position.x + 5, this.position.y + 5, archer.position.x + 25, archer.position.y + 25) < 30){
		archer.dead = 1;
	}
};


var arrowObj = function(x, y, f){
	this.position = new PVector(x, y);
	this.velocity =  new PVector(0, 0);
	this.acceleration = new PVector(0, 0);
	this.currFrame = 0;
	this.speed = 5;
	this.facing = f; //0 = right, 1 = left
};

arrowObj.prototype.draw = function(){
	image(arrowImg, this.position.x, this.position.y, 20, 8);
};

arrowObj.prototype.move = function(){
	this.draw();
	if(!this.facing){
		this.position.x+= this.speed;
	}
	else{
		this.position.x-= this.speed;
	}
	this.currFrame++;
	if(this.currFrame > 50){
		this.currFrame = -1;
	}
};

var batObj = function(x, y){
	this.position = new PVector(x, y);
	this.velocity =  new PVector(0, 0);
	this.acceleration = new PVector(0, 0);
	this.currFrame = 0;
	this.speed = -1;
	this.moveState = 0;
	this.initPosX = x;
	this.dead = 0;
	this.leaveTree = 0;
};

var initBatMovement = function(){
	batMovement.push(loadImage("Sprites/bat/bat_move_left_1.png"));
	batMovement.push(loadImage("Sprites/bat/bat_move_left_2.png"));
	batMovement.push(loadImage("Sprites/bat/bat_move_left_3.png"));
	batMovement.push(loadImage("Sprites/bat/bat_move_right_1.png"));
	batMovement.push(loadImage("Sprites/bat/bat_move_right_2.png"));
	batMovement.push(loadImage("Sprites/bat/bat_move_right_3.png"));
};

batObj.prototype.draw = function(){
	image(batMovement[this.moveState], this.position.x, this.position.y, 40, 40);
	
};

batObj.prototype.move = function(){
	
	if(this.position.x < this.initPosX - 84){
		this.speed = -this.speed;
		this.moveState = 3;
	}
	if(this.position.x > this.initPosX + 84){
		this.speed = -this.speed;
		this.moveState = 0;
	}
	if(this.speed <= 0){
		if(this.currFrame >= 10){
			this.moveState++;
			this.currFrame = 0;
		}
		if(this.moveState > 2){
			this.moveState = 0;
		}
	}
	else{
		if(this.currFrame >= 10){
			this.moveState++;
			this.currFrame = 0;
		}
		if(this.moveState > 5){
			this.moveState = 4;
		}
	}
	this.position.x += this.speed;
	this.currFrame++;
	
};

batObj.prototype.checkCollision = function(){
	for(var i = 0; i < arrows.length; i++){
		if(dist(this.position.x, this.position.y, arrows[i].position.x, arrows[i].position.y) < 30){
			this.dead = 1;
			arrows.splice(i, 1);
		}
	}
	if(dist(this.position.x, this.position.y, archer.position.x, archer.position.y) < 30){
		archer.dead = 1;
	}
	if(dist(this.position.x, this.position.y, archer.position.x, archer.position.y) < 200){
		this.leaveTree = 1;
	}
};
////////////////////////////////////////

var bossBatObj = function(x, y){
	this.position = new PVector(x, y);
	this.velocity =  new PVector(0, 0);
	this.acceleration = new PVector(0, 0);
	this.currFrame = 0;
	this.speed = -1;
	this.moveState = 0;
	this.initPosX = x;
	this.dead = 0;
	this.leaveCave = 0;
	this.fireballTimer = 0;
	this.hp = 3;
    this.shoot = 0;
};

var initBossBatMovement = function(){
	bossBatMovement.push(loadImage("Sprites/bat/boss_bat_1.png"));
	bossBatMovement.push(loadImage("Sprites/bat/boss_bat_2.png"));
	//bossBatMovement.push(loadImage("Sprites/bat/big_bat_3.png"));
	
};

bossBatObj.prototype.draw = function(){
	image(bossBatMovement[this.moveState], this.position.x, this.position.y, 300, 250);
	
};

bossBatObj.prototype.move = function(){
	
	if(this.currFrame >= 10){
		this.moveState++;
		if(this.moveState > 1){
			this.moveState = 0;
		}
		this.currFrame = 0;
	}
	if(this.fireballTimer >= 100 && this.shoot){
		fireballObjects.push(new fireballObj(this.position.x + 130, this.position.y + 150, archer.position.x, archer.position.y));
		this.fireballTimer = 0;
	}
    if(this.shoot = 0){
		fireballObjects = [];
	}
	this.fireballTimer++;
	this.currFrame++;
	/*
	if(this.position.x < this.initPosX - 84){
		this.speed = -this.speed;
		this.moveState = 3;
	}
	if(this.position.x > this.initPosX + 84){
		this.speed = -this.speed;
		this.moveState = 0;
	}
	if(this.speed <= 0){
		if(this.currFrame >= 10){
			this.moveState++;
			this.currFrame = 0;
		}
		if(this.moveState > 2){
			this.moveState = 0;
		}
	}
	else{
		if(this.currFrame >= 10){
			this.moveState++;
			this.currFrame = 0;
		}
		if(this.moveState > 5){
			this.moveState = 4;
		}
	}
	this.position.x += this.speed;
	this.currFrame++;*/	
};

bossBatObj.prototype.checkCollision = function(){
	for(var i = 0; i < arrows.length; i++){
		if((arrows[i].position.x >= this.position.x) && (arrows[i].position.x <= this.position.x + 300) && (arrows[i].position.y >= this.position.y) && (arrows[i].position.y <= this.position.y + 250)){
			this.hp--;
			arrows.splice(i, 1);
			if(this.hp <= 0){
				this.dead = 1;
			}
		}
	}
	if((archer.position.x + 25 >= this.position.x) && (archer.position.x + 25 <= this.position.x + 300) && (archer.position.y + 30 >= this.position.y) && (archer.position.y + 30 <= this.position.y + 250)){
		archer.dead = 1;
	}
	if(dist(this.position.x, this.position.y, archer.position.x, archer.position.y) < 300){
		this.leaveCave = 1;
        this.shoot = 1;
	}
    else {
		this.shoot = 0;
	}
};
/////////////////////////////DRAGON//////////////////////////////////
var dragObj = function(x, y){
	this.position = new PVector(x, y);
	this.velocity =  new PVector(0, 0);
	this.acceleration = new PVector(0, 0);
	this.currFrame = 0;
	this.speed = -1;
	this.moveState = 0;
	this.initPosX = x;
	this.dead = 0;
	this.fireballTimer = 0;
	this.hp = 3;
};

var initDragMovement = function(){
	dragMovement.push(loadImage("Sprites/dragon/blue_drag_1.png"));
	dragMovement.push(loadImage("Sprites/dragon/blue_drag_2.png"));
	dragMovement.push(loadImage("Sprites/dragon/blue_drag_3.png"));
	dragMovement.push(loadImage("Sprites/dragon/blue_drag_2.png"));
};

dragObj.prototype.draw = function(){
	image(dragMovement[this.moveState], this.position.x, this.position.y, 300, 250);
	
};

dragObj.prototype.move = function(){
	
	if(this.currFrame >= 10){
		this.moveState++;
		if(this.moveState > 3){
			this.moveState = 0;
		}
		this.currFrame = 0;
	}
	if(this.fireballTimer >= 100){
		fireballObjects.push(new fireballObj(this.position.x + 130, this.position.y + 150, archer.position.x, archer.position.y));
		this.fireballTimer = 0;
	}
	this.fireballTimer++;
	this.currFrame++;
};

dragObj.prototype.checkCollision = function(){
	for(var i = 0; i < arrows.length; i++){
		if((arrows[i].position.x >= this.position.x) && (arrows[i].position.x <= this.position.x + 300) && (arrows[i].position.y >= this.position.y) && (arrows[i].position.y <= this.position.y + 250)){
			this.hp--;
			arrows.splice(i, 1);
			if(this.hp <= 0){
				this.dead = 1;
			}
		}
	}
	if((archer.position.x + 25 >= this.position.x) && (archer.position.x + 25 <= this.position.x + 300) && (archer.position.y + 30 >= this.position.y) && (archer.position.y + 30 <= this.position.y + 250)){
		archer.dead = 1;
	}
	if(dist(this.position.x, this.position.y, archer.position.x, archer.position.y) < 300){
		this.leaveCave = 1;
	}
};

//////////////////////////////////GOLEM///////////////////////////////////
var golemObj = function(x, y){
	this.position = new PVector(x, y);
	this.velocity =  new PVector(0, 0);
	this.acceleration = new PVector(0, 0);
	this.currFrame = 0;
	this.speed = -1;
	this.moveState = 0;
	this.initPosX = x;
	this.dead = 0;
};


var initGolemMovement = function(){
	golemMovement.push(loadImage("Sprites/golem/golem_walk_left_1.png"));
	golemMovement.push(loadImage("Sprites/golem/golem_walk_left_2.png"));
	golemMovement.push(loadImage("Sprites/golem/golem_walk_left_3.png"));
	golemMovement.push(loadImage("Sprites/golem/golem_walk_left_4.png"));
	golemMovement.push(loadImage("Sprites/golem/golem_walk_left_5.png"));
	golemMovement.push(loadImage("Sprites/golem/golem_walk_left_6.png"));
	
	golemMovement.push(loadImage("Sprites/golem/golem_walk_right_2.png"));
	golemMovement.push(loadImage("Sprites/golem/golem_walk_right_3.png"));
	golemMovement.push(loadImage("Sprites/golem/golem_walk_right_4.png"));
	golemMovement.push(loadImage("Sprites/golem/golem_walk_right_5.png"));
	golemMovement.push(loadImage("Sprites/golem/golem_walk_right_6.png"));
	golemMovement.push(loadImage("Sprites/golem/golem_walk_right_7.png"));
	
};


golemObj.prototype.draw = function(){
	image(golemMovement[this.moveState], this.position.x, this.position.y - 29, 50, 80);
	
};

golemObj.prototype.move = function(){
	
	if(this.position.x < this.initPosX - 84){
		this.speed = -this.speed;
		this.moveState = 7;
	}
	if(this.position.x > this.initPosX + 84){
		this.speed = -this.speed;
		this.moveState = 0;
	}
	if(this.speed <= 0){
		if(this.currFrame >= 10){
			this.moveState++;
			this.currFrame = 0;
		}
		if(this.moveState > 5){
			this.moveState = 0;
		}
	}
	else{
		if(this.currFrame >= 10){
			this.moveState++;
			this.currFrame = 0;
		}
		if(this.moveState > 11){
			this.moveState = 6;
		}
	}
	this.position.x += this.speed;
	this.currFrame++;
	
};

golemObj.prototype.checkCollision = function(){
	for(var i = 0; i < arrows.length; i++){
		if(dist(this.position.x, this.position.y, arrows[i].position.x, arrows[i].position.y) < 30){
			this.dead = 1;
			arrows.splice(i, 1);
		}
	}
	if(dist(this.position.x, this.position.y, archer.position.x, archer.position.y) < 30){
		archer.dead = 1;
	}
};



//LOAD IMAGES
var initArcherMovement = function(){
	archerMovement.push(loadImage("Sprites/archer/walk_right_1.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_right_2.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_right_3.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_right_4.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_right_5.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_right_6.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_right_7.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_right_8.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_right_9.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_left_1.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_left_2.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_left_3.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_left_4.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_left_5.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_left_6.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_left_7.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_left_8.png"));
	archerMovement.push(loadImage("Sprites/archer/walk_left_9.png"));
	archerDead.push(loadImage("Sprites/archer/die_1.png"));
	archerDead.push(loadImage("Sprites/archer/die_2.png"));
	archerDead.push(loadImage("Sprites/archer/die_3.png"));
	archerDead.push(loadImage("Sprites/archer/die_4.png"));
	archerDead.push(loadImage("Sprites/archer/die_5.png"));
	archerDead.push(loadImage("Sprites/archer/die_6.png"));
};

var initArcherShoot = function(){
	archerShoot.push(loadImage("Sprites/archer/shoot_right_1.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_right_2.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_right_3.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_right_4.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_right_5.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_right_6.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_right_7.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_right_8.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_right_9.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_right_10.png"));
	
	archerShoot.push(loadImage("Sprites/archer/shoot_left_1.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_left_2.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_left_3.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_left_4.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_left_5.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_left_6.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_left_7.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_left_8.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_left_9.png"));
	archerShoot.push(loadImage("Sprites/archer/shoot_left_10.png"));
};
///////////////////////////////////////////


archerObj.prototype.applyForce = function(force){
	this.acceleration.add(force);
};


archerObj.prototype.draw = function(){
	//MOVE RIGHT
	if(this.moveState === 0){
		image(archerMovement[0], this.position.x, this.position.y, 50, 60);
	}
	else if (this.moveState === 1){
		image(archerMovement[1], this.position.x, this.position.y, 50, 60);
	}
	else if (this.moveState === 2){
		image(archerMovement[2], this.position.x, this.position.y, 50, 60);
	}
	else if (this.moveState === 3){
		image(archerMovement[3], this.position.x, this.position.y, 50, 60);
	}
	else if (this.moveState === 4){
		image(archerMovement[4], this.position.x, this.position.y, 50, 60);
	}
	else if (this.moveState === 5){
		image(archerMovement[5], this.position.x, this.position.y, 50, 60);
	}
	else if (this.moveState === 6){
		image(archerMovement[6], this.position.x, this.position.y, 50, 60);
	}
	else if (this.moveState === 7){
		image(archerMovement[7], this.position.x, this.position.y, 50, 60);
	}
	else if (this.moveState === 8){
		image(archerMovement[8], this.position.x, this.position.y, 50, 60);
	}
	///MOVE RIGHT END///
	
	//MOVE LEFT
	else if(this.moveState === 9){
		image(archerMovement[9], this.position.x, this.position.y - 5, 50, 60);
	}
	else if (this.moveState === 10){
		image(archerMovement[10], this.position.x, this.position.y- 5, 50, 60);
	}
	else if (this.moveState === 11){
		image(archerMovement[11], this.position.x, this.position.y- 5, 50, 60);
	}
	else if (this.moveState === 12){
		image(archerMovement[12], this.position.x, this.position.y- 5, 50, 60);
	}
	else if (this.moveState === 13){
		image(archerMovement[13], this.position.x, this.position.y- 5, 50, 60);
	}
	else if (this.moveState === 14){
		image(archerMovement[14], this.position.x, this.position.y- 5, 50, 60);
	}
	else if (this.moveState === 15){
		image(archerMovement[15], this.position.x, this.position.y- 5, 50, 60);
	}
	else if (this.moveState === 16){
		image(archerMovement[16], this.position.x, this.position.y- 5, 50, 60);
	}
	else if (this.moveState === 17){
		image(archerMovement[17], this.position.x, this.position.y- 5, 50, 60);
	}
	///MOVE LEFT END///
	
	//SHOOT RIGHT
	if(this.moveState === 18){
		if(this.fire < 9){
 			if(this.currFrame >= 3){
				this.fire++;
				this.currFrame = 0;
			}
			image(archerShoot[this.fire], this.position.x, this.position.y - 5, 50, 60);
		}
		else{
			this.fire = -1;
			this.moveState = 0;
		}
	}
	///SHOOT RIGHT END///
	
	//SHOOT LEFT
	
	if(this.moveState === 19){
		if(this.fire < 19){
			if(this.currFrame >= 3){
				this.fire++;
				this.currFrame = 0;
			}
			image(archerShoot[this.fire], this.position.x, this.position.y, 50, 60);
		}
		else{
			this.fire = -1;
			this.moveState = 9;
		}
	}
	
	if(this.moveState === 20){
		
		image(archerDead[this.deadState], this.position.x, this.position.y, 50, 60);
		
		if(this.currFrame >= 10){
			this.deadState++;
			this.currFrame = 0;
			if(this.deadState > 5){
				restart();
			}
		}
		this.moveState = 20;
		this.currFrame++;
	}
	///SHOOT LEFT END///
	
};

archerObj.prototype.move = function(){
	
	//SHOOT WITH "X"
	if(keyArray[88] === 1 && this.fire === -1){
		if(this.ammo > 0){
			if(this.moveState < 9){
				this.moveState = 18;
				this.fire = 0; 																//set shoot right animation
				arrows.push(new arrowObj(this.position.x + 20, this.position.y + 25, 0)); 	//add arrow moving right
			}
			else if (this.moveState < 18){
				this.moveState = 19;
				this.fire = 10;																//set shoot left animation
				arrows.push(new arrowObj(this.position.x + 20, this.position.y + 25, 1));   //add arrow moving left
			}
			this.ammo--;
		}
		this.currFrame = 3;
	}
	//IF NOT SHOOTING
	if(this.fire === -1){
		
		//MOVE RIGHT
		if(keyArray[RIGHT] === 1){
		    this.rightMovBlocked = 0;
			for(var i = 0; i < groundObjects.length; i++){
				if(this.position.x + 45 >= groundObjects[i].x && this.position.x + 45 <= groundObjects[i].x + 50 && this.position.y + 40 >= groundObjects[i].y && this.position.y + 40 <= groundObjects[i].y + 50){
					this.rightMovBlocked = 1;
				}
			}
			if(!this.rightMovBlocked){
    			if(this.position.x < 4750){
    				this.position.x += 3;
    			}
    			if(this.position.x > 200 && this.position.x < 3800){
    				game.xCor += -3;
    			}
			}
			if (this.currFrame >= 5){
				this.moveState++;
				if(this.moveState > 8){
					this.moveState = 0;
				}
				this.currFrame = 0;
			}
			this.facingDir = 1;
		}
		//MOVE LEFT
		else if(keyArray[LEFT] === 1){
		    this.leftMovBlocked = 0;
			for(var i = 0; i < groundObjects.length; i++){
				if(this.position.x <= groundObjects[i].x + 45 && this.position.x >= groundObjects[i].x && this.position.y + 40 >= groundObjects[i].y && this.position.y + 40 <= groundObjects[i].y + 50){
					this.leftMovBlocked = 1;
				}
			}
			if(!this.leftMovBlocked){
    			if(this.position.x > 0){
    				this.position.x += -3;
    			}
    			if(this.position.x > 200  && this.position.x < 3800){
    				game.xCor += 3;
    			}
			}
			if (this.currFrame >= 5){
				if(this.moveState < 8){
					this.moveState = 8;
				}
				this.moveState++;
				if(this.moveState > 17){
					this.moveState = 9;
				}
				this.currFrame = 0;
			}
			this.facingDir = -1;
		}
		else{
			if(this.facingDir === 1){
				this.moveState = 0;
				this.currFrame = 0;
			}
			else if(this.facingDir === -1){
				this.moveState = 9;
				this.currFrame = 0;
			}
			
		}
	}
	
	//JUMP WITH "SPACE"
	if(keyArray[32] === 1 && this.jump === 0){
		this.jump = 2;
	}
	if(this.jump === 2){
		this.applyForce(jumpForce);
		this.jump = 1;
	}
	if (this.jump > 0){
		this.applyForce(gravity);
	}
	this.velocity.add(this.acceleration);
	if(this.velocity.y >= 0 && this.jump === 1){
		this.checkCollision();
		if(!this.fall){
			this.velocity.set(0, 0);
			this.acceleration.set(0, 0);
			this.jump = 0;
		}
	}
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
	if(this.jump === 0){
		this.checkCollision();
		if(this.fall){
			this.applyForce(gravity);
		}
		else{
			this.velocity.set(0, 0);
			this.acceleration.set(0, 0);
			this.jump = 0;
		}
	}
	if(this.position.y > 650){
		this.dead = 1;
	}
	
	this.currFrame++;
};

archerObj.prototype.checkCollision = function(){
	this.fall = 1;
	for(var i = 0; i < groundObjects.length; i++){
		if((this.position.x >= groundObjects[i].x) && (this.position.x + 15 <= groundObjects[i].x + 50)){
			if(this.position.y + 50 > groundObjects[i].y && this.position.y + 50 < groundObjects[i].y + 20){
				this.fall = 0;
				this.position.y = groundObjects[i].y - 50;
			}
		}
		if((this.position.x + 35 >= groundObjects[i].x) && (this.position.x + 50 <= groundObjects[i].x + 50)){
			if(this.position.y + 50 > groundObjects[i].y && this.position.y + 50 < groundObjects[i].y + 20){
				this.fall = 0;
				this.position.y = groundObjects[i].y - 50;
			}
		}
		
	}

};


collectiblesObj.prototype.collisionChecker = function(){
	if(dist(this.x, this.y, archer.position.x, archer.position.y) < 20 && this.type === 0){
		archer.ammo++
		this.type = 10;
	}
	if(dist(this.x, this.y, archer.position.x, archer.position.y) < 30 && this.type === 1){
		archer.life++
		this.type = 10;
	}
};

var groundObj = function(x, y, t){
	this.x = x;
	this.y = y;
	this.size = 50;
	this.type = t;
};

groundObj.prototype.draw = function(){
	if(game.level === 1){
		if(this.type === 0){
			image(groundImg, this.x, this.y, this.size, this.size);
		}
		if(this.type === 1){
			image(flyingGroundImg, this.x, this.y, this.size, this.size - 30);
		}
		if(this.type === 2){
			image(dirtGroundImg, this.x, this.y, this.size, this.size);
		}
	}
	if(game.level === 2){
		if(this.type === 0){
			image(stoneGroundImg, this.x, this.y, this.size, this.size);
		}
		if(this.type === 1){
			image(flyingStoneImg, this.x, this.y, this.size, this.size - 30);
		}
		if(this.type === 2){
			image(stoneGroundImg, this.x, this.y, this.size, this.size);
		}
	}
	
	if(game.level >= 3){
		if(this.type === 0){
			image(snowImg, this.x, this.y, this.size, this.size);
		}
		if(this.type === 1){
			image(flyingSnowImg, this.x, this.y, this.size, this.size - 30);
		}
		if(this.type === 2){
			image(snowGroundImg, this.x, this.y, this.size, this.size);
		}
	}
};



//Function to change tilemap for different levels	
var setTileMap = function(){
	if(game.level === 1){
		game.tileMap =[
		"--------------------------------------------c---------------------------------c------------------",
		"---------c-----------c-------------c----------------c------------c----------------------c--------",
		"-c--------------c------------------------------c------------------------c------------------------",
		"---------------------------c-----d--------c------------------c----------------------c------------",
		"-------c------------c----------a-b---------------------------------------------------------------",
		"-----------------------------ffffff---------------a---c---------------------------c--------------",
		"-------------------------------------------------ffff-------------------------------------B------",
		"--a--------------------ffff----------------------------fff-------d-------------------------------",
		"--ff-----------------------------------------------a-------------b----------------fffff----------",
		"-------a---------gg-----d---ff---d------------d---ff------gggggggggg------d---ff-------d---------",
		"-----gggg---g--ggzz-----b--------b-----gg-----b--------gggzzzzzzzzzz------b------ -----b---------",
		"gggggzzzzgggz gzzzzggggggggggggggggggggzzg ggggggggggggzzzzzzzzzzzzzggggggggggggggggggggggggggggg",];
        
        groundObjects = [];
        batObjects = [];
        treeObjects = [];
        cloudObjects = [];
        bossBatObjects = [];
        ammoObjects = [];
		healthObjects = [];
        game.initTileMap();
	}
	if(game.level === 2){
		game.tileMap =[
		"--------------------------------------------c---------------------------------c------------------",
		"---------c-----------c-------------c----------------c------------c----------------------c--------",
		"-c--------------c------------------------------c------------------------c---------------------c--",
		"--------------------a------c-----a--------c-------------c---------------------------c------------",
		"-------a------------ff-----------ff-----------------------------d--------------------------------",
		"-----fff----d----------ffd----------a----------c----------------b-----------------c------------gg",
		"------------b--fff-------b----------ff----------------------ggggggg---------------------------ggg",
		"---------gggg----------ggg-------df----------------------agzzzzzzzz--a--fff-----d-------------ggg",
		"-----ggggzzzzg--------gzzzgg--a--b------d---------------ggzzzzzzzzz--f----------b-----------ggggg",
		"----gzzzzzzzzz-------gzzzzzzggggggggg---b--ggggg------ggzzzzzzzzzzz----------ffff---------ggggggg",
		"---gzzzzzzzzzz-------zzzzzzzzzzzzzzzzggggggzzzzzg--a-gzzzzzzzzzzzzz-------------a--------gggggggg",
		"gggzzzzzzzzzzz     ggzzzzzzzzzzzzzzzzzzzzzzzzzzzzgggggzzzzzzzzzzzzz             ggggggggggggggggg",];
        
        groundObjects = [];
        batObjects = [];
        treeObjects = [];
        cloudObjects = [];
        bossBatObjects = [];
        ammoObjects = [];
		healthObjects = [];
        game.initTileMap();
	}
    if(game.level === 3){
		game.tileMap =[
		"--------------------------------------------c---------------------------------c------------------",
		"---------c-----------c-------------c----------------c------------c----------------------c--------",
		"-c--------------c--------------------d---------c------------------------c---------------------c--",
		"------------d--------------c--------------c---d---------c--------d------------------c---d--------",
		"-------------------------d---------ggg----------------------------s-------------------------------",
		"-----------ggg-------------s------gzzzgggg--ggggg-----d--------ggggggg---d-------d------ggg--d---",
		"--------gggzzzggg-----ggggggggggggzzzzzzzzggzzzzzgg----s----gggzzzzzzzgg------------ggggzzzg-----",
		"--------zzzzzzzzzgggggzzzzzzzzzzzzzzzzzzzzzzzzzzzzzgggggggggzzzzzzzzzzzzgggg----ggggzzzzzzzzgg---",
		"-------gzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzggggzzzzzzzzzzzzzz---",
		"-----ggzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzggg",
		"----gzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
		"ggggzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",];
        
        groundObjects = [];
        batObjects = [];
        treeObjects = [];
        cloudObjects = [];
        bossBatObjects = [];
        ammoObjects = [];
		healthObjects = [];
        game.initTileMap();
	}
	
	if(game.level === 4){
		game.tileMap =[
		"--------------------------------------------c---------------------------------c------------------",
		"---------c-----------c-------------c----------------c------------c----------------------c--------",
		"-c--------------c------------------------------c------------------------c---------------------c--",
		"---------------------------c--------------c-------------c---------------------------c------------",
		"-------------------------------------------------------------------------------------------------",
		"-------------------------------------------------------------------------------------------------",
		"---------------D---------------------------------------------------------------------------------",
		"-------------------------------------------------------------------------------------------------",
		"-------------------------------------------------------------------------------------------------",
		"---d---d--d--d-----------------------------------------------------------------------------------",
		"-------------------------------------------------------------------------------------------------",
		"ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",];
        
        groundObjects = [];
        batObjects = [];
        treeObjects = [];
        cloudObjects = [];
        bossBatObjects = [];
        ammoObjects = [];
		healthObjects = [];
        game.initTileMap();
	}
	
};

gameObj.prototype.initTileMap = function(){
	for (var i=0; i<this.tileMap.length; i++) {
        for (var j=0; j<this.tileMap[i].length; j++) {
            if (this.tileMap[i][j] === 'g') {
                groundObjects.push(new groundObj(j*50, i*50, 0));
            }
			if(this.tileMap[i][j] === 'f') {
                groundObjects.push(new groundObj(j*50, i*50, 1));
            }
			if(this.tileMap[i][j] === 'z') {
                groundObjects.push(new groundObj(j*50, i*50, 2));
            }
			if (this.tileMap[i][j] === 'b') {
                batObjects.push(new batObj(j*50, i*50));
            }
			if (this.tileMap[i][j] === 'd') {
				if(game.level >= 3){
					treeObjects.push(new treeObj(j*50, i*50 + 10, 1));
				}
				else{
					treeObjects.push(new treeObj(j*50, i*50 + 10, 0));
				}
            }
			if (this.tileMap[i][j] === 'c') {
                cloudObjects.push(new cloudObj(j*50, i*50));
            }
			if(this.tileMap[i][j] === 'B'){
				bossBatObjects.push(new bossBatObj(j*50, i*50));
			}
            if(this.tileMap[i][j] === 'D'){
				dragObjects.push(new dragObj(j*50, i*50));
			}
			if (this.tileMap[i][j] === 'a') {
                ammoObjects.push(new collectiblesObj(j*50, i*50, 0));
            }
			if (this.tileMap[i][j] === 'h') {
                healthObjects.push(new collectiblesObj(j*50, i*50, 1));
            }
			if (this.tileMap[i][j] === 's') {
                golemObjects.push(new golemObj(j*50, i*50));
            }
			
        }
    }
};

var displayTileMap = function(){
	if(game.level === 1){
		image(caveImg, 4600, 345, 300, 300);
	}
	if(game.level === 3){
		snowflakeFrame++;
		if(snowflakeFrame >= 10 && snowflakes.length < 1000){
			snowflakes.push(new snowflakeObj());
			snowflakeFrame = 0;
		}
		for(var i = 0; i < snowflakes.length; i++){
			snowflakes[i].draw();
		}
	}
	else{
		snowflakes = [];
	}
	for(var i = 0; i < cloudObjects.length; i++){
		cloudObjects[i].draw();
	}
	for (var i = 0; i < groundObjects.length; i++){
		groundObjects[i].draw();
	}
	for(var i = 0; i < treeObjects.length; i++){
		treeObjects[i].draw();
	}
	for(var i = 0; i < ammoObjects.length; i++){
		ammoObjects[i].draw();
		ammoObjects[i].collisionChecker();
	}
	for(var i = 0; i < healthObjects.length; i++){
		healthObjects[i].draw();
		healthObjects[i].collisionChecker();
	}
	for (var i = 0; i < batObjects.length; i++){
		if(!batObjects[i].dead){
			batObjects[i].checkCollision();
			if(batObjects[i].leaveTree){
				batObjects[i].draw();
				batObjects[i].move();
			}
		}
		else{
			batObjects.splice(i, 1);
		}
	}
	
	for (var i = 0; i < golemObjects.length; i++){
		if(!golemObjects[i].dead){
			golemObjects[i].checkCollision();		
			golemObjects[i].draw();
			golemObjects[i].move();
			
		}
		else{
			golemObjects.splice(i, 1);
		}
	}
	
	for (var i = 0; i < bossBatObjects.length; i++){
		if(!bossBatObjects[i].dead){
			bossBatObjects[i].checkCollision();
			if(bossBatObjects[i].leaveCave){
				bossBatObjects[i].draw();
				bossBatObjects[i].move();
			}
		}
		else{
			if(archer.position.x > 4700){
                game.level = 2;
                setTileMap();
                game.xCor = 0;
                archer.position.x = 0;
                archer.position.y = 500;
            }
		}
	}
    for (var i = 0; i < dragObjects.length; i++){
		if(!dragObjects[i].dead){
			dragObjects[i].checkCollision();
            dragObjects[i].draw();
		    dragObjects[i].move();
		}
		else if(dragObjects[i].dead){
			win = 1;
		}
	}
	
	for(var i = 0; i < fireballObjects.length; i++){
		fireballObjects[i].move();
		if(fireballObjects[i].currFrame >= 300){
			fireballObjects.splice(i, 1);
		}
	}
	if(!archer.dead){	
		archer.draw();
	}
	else{
		if(archer.moveState !== 20){
			archer.life--;
			archer.moveState = 20;
		}
		archer.draw();
	}
    
    if(archer.position.x > 4750 && game.level === 2){
		game.level = 3;
		setTileMap();
		game.xCor = 0;
		archer.position.x = 0;
		archer.position.y = 500;
	}
	if(archer.position.x > 4750 && game.level === 3){
		game.level = 4;
		setTileMap();
		game.xCor = 0;
		archer.position.x = 0;
		archer.position.y = 500;
	}
};

setClouds();
initBatMovement();
initBossBatMovement();
initDragMovement();
game.initTileMap();
initArcherMovement();
initArcherShoot();
initGolemMovement();
fill(0, 0, 0);

var displayMisc = function(){
	image(archerHeadImage, 10, 0, 30, 40);
	for(var i = 0; i < archer.life; i++){
		image(heartImage, i * 20 + 45, 8, 20, 30);
	}
	for(var i = 0; i < archer.ammo; i++){
		image(arrowUpImage, i * 20 + 45, 40, 20, 30);
	}
};
var gameOver = function(){
	background(0, 0, 0);
};
var restart = function(){
	if(archer.life <= 0){		
		lose = 1;
	}
	else{
		var temp_life = archer.life;
		archer = new archerObj(0, 500);
		archer.life = temp_life;
        game.xCor = 0;
        for(var i = 0; i < bossBatObjects.length; i++){
			bossBatObjects[i].leaveCave = 0;
		}
		//game = new gameObj();
		//game.initTileMap();
	}
};

var restartToStart = function(){
	groundObjects = [];
	batObjects = [];
	bossBatObjects = [];
    dragObjects = [];
	fireballObjects = [];
	arrows = [];
	cloudObjects = [];
	healthObjects = [];
	golemObjects = [];
	archer = new archerObj(0, 500);
	game.level = 1;
    game.xCor = 0;
    setTileMap();

};
    

///////////////CHECKPOINT 2 END//////////////////////


var winScreen = function(){
	background(0, 0, 0);
	var title = " You are a true adventurer. Congratulations!";
    fill(245, 245, 37);
    textSize(40);
    text(title, 450, 150, 300, 400);
};

//Mouse control implementation
mouseReleased = function() {
    if(start_screen){
        if(mouseButton === LEFT){
            play_screen = 1;
            start_screen = 0;
            instruction_screen = 0;
            
        }
        if(mouseButton === RIGHT){
            play_screen = 0;
            start_screen = 0;
            instruction_screen = 1;
        }
    }
    
    else if(instruction_screen){
        if(mouseButton === LEFT){
            play_screen = 1;
            start_screen = 0;
            instruction_screen = 0;
            
        }
        if(mouseButton === RIGHT){
            play_screen = 0;
            start_screen = 1;
            instruction_screen = 0;
        }
    }
    
    else if(win){
		if(mouseButton === LEFT){
			win = 0;
			start_screen = 1;
            restartToStart();           
        }
    }
};

var keyPressed = function() {
    keyArray[keyCode] = 1;
};
var keyReleased = function() {
    if(start_screen){
        if(keyArray[32] === 1){
            space_released = 1;
        }
    }
    keyArray[keyCode] = 0;
};

//MAIN
var draw = function() {
	//Start Screen
    if(start_screen){
        startScreen();
		hero1.draw();
		hero2.draw();
        bat1Start.draw();
		bat2Start.draw();
        for(var i = 0; i < fireDrops.length; i++){
			fireDrops[i].draw();
		}
    }
	//Instruction Screen
    else if(instruction_screen){
        instructions();
    }
	else if(win){
		start_screen = 0;
		play_screen = 0;
		winScreen();
	}
	else if(lose){
		restartToStart();
		start_screen = 1;
		play_screen = 0;
		lose = 0;
	}
	//Play
    else if(play_screen)
    {
		noStroke();
        if(game.level === 1){
            background(30, 144, 255);
        }
        else if(game.level === 2){
           background(12, 12, 39);
        }
		else if(game.level >= 3){
			background(179, 218, 255);
		}
		pushMatrix();
		translate(game.xCor, 0);
        displayTileMap();
		if(!archer.dead){
			archer.move();
		}
		for (var i = 0; i < arrows.length; i++){
			arrows[i].move();
			if(arrows[i].currFrame === -1){
				arrows.splice(i, 1);
			}
		}
		popMatrix();
        displayMisc();
    }
};

/////////////////////////Program Ends///////////////////////////////
}};
