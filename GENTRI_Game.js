var game = new Phaser.Game(831,600,Phaser.CANVAS, 'gameDiv');
var city;
var purplebird;
var cursors;
var startgame;
var next;
var inst1;
var inst2;
var coin;
var plane;
var wreckingball;
var collisionHandler;
var destroySprite;
var gentri;
var scoreUp;
var score = 0;
var scoreText;
var collisionHandler;
var mainState = {
	preload:function(){
		game.load.image('city' , "assets/city.png");
		game.load.image('startgame', "assets/start.png");
		game.load.image('gentri', "assets/gentri.png");
	},

	create:function(){
	 	city = game.add.tileSprite(0,0,831,600,'city');
	 	gentri = game.add.tileSprite(game.world.centerX-405, game.world.centerY+220, 70, 70, 'gentri');
	 	var startgame = this.game.add.button(game.world.centerX-100, game.world.centerY-100, "startgame",this.playTheGame, this);
	},
	
	update:function(){
	 	city.tilePosition.x -=2;
	},

	playTheGame:function(){
		this.game.state.start("instructionState");
	}
};

var instructionState = {
	preload:function(){
		game.load.image('inst1' , "assets/inst1.png");
		game.load.image('next', "assets/next.png");
		game.load.image('gentri', "assets/gentri.png");
	},

	create:function(){
	 	inst1 = game.add.tileSprite(0,0,831,600,'inst1');
	 	gentri = game.add.tileSprite(game.world.centerX-405, game.world.centerY+220, 70, 70, 'gentri');
	 	var next = this.game.add.button(game.world.centerX+270, game.world.centerY+180, "next",this.gonext, this);
	
	},
	
	gonext:function(){
		this.game.state.start("instructionState2");
	}
};

var instructionState2 = {
	preload:function(){
		game.load.image('inst2' , "assets/inst2.png");
		game.load.image('next', "assets/next.png");
		game.load.image('gentri', "assets/gentri.png");
	},

	create:function(){
	 	inst2 = game.add.tileSprite(0,0,831,600,'inst2');
	 	gentri = game.add.tileSprite(game.world.centerX-405, game.world.centerY+220, 70, 70, 'gentri');
	 	var next = this.game.add.button(game.world.centerX+270, game.world.centerY+180, "next",this.playnow, this);
	
	},
	
	playnow:function(){
		this.game.state.start("instructionState3");
	}
};

var instructionState3 = {
	preload:function(){
		game.load.image('inst3' , "assets/inst3.png");
		game.load.image('next', "assets/next.png");
		game.load.image('gentri', "assets/gentri.png");
	},

	create:function(){
	 	inst2 = game.add.tileSprite(0,0,831,600,'inst3');
	 	gentri = game.add.tileSprite(game.world.centerX-405, game.world.centerY+220, 70, 70, 'gentri');
	 	var next = this.game.add.button(game.world.centerX+270, game.world.centerY+180, "next",this.playnow, this);
	
	},
	
	playnow:function(){
		this.game.state.start("playState");
	}
};

var playState = {
	preload:function(){
		game.load.image('city' , "assets/city.png");
		game.load.image('purplebird' , "assets/purplebird.jpg");
		game.load.image('coin', "assets/coin.png");
		game.load.image('plane', "assets/plane.jpg");
		game.load.image('wreckingball', "assets/wreckingball.jpg");
		game.load.image('gentri', "assets/gentri.png");
	},

	create:function(){
		city = game.add.tileSprite(0,0,831,600,'city');
		gentri = game.add.tileSprite(game.world.centerX-405, game.world.centerY+220, 70, 70, 'gentri');
		purplebird = game.add.sprite(game.world.centerX - 250,game.world.centerY - 100, "purplebird");
		game.physics.enable(purplebird,Phaser.Physics.ARCADE);
		cursors = game.input.keyboard.createCursorKeys();

		coins = game.add.physicsGroup();
   		var y = -300;
    	for (var i = 5; i < 100; i++) {
	    	var coin = coins.create(game.world.randomX, y, 'coin');
	    	coin.body.velocity.y = game.rnd.between(80,100);
	    	coin.body.velocity.x -=20;
	    	y += 50;
    	};

    	planes = game.add.physicsGroup();
    	var py = - 300;
    	for (var i = 5; i < 50; i++) {
	    	var plane = planes.create(game.world.randomX, py, 'plane');
	    	plane.body.velocity.y = game.rnd.between(80,100);
	    	plane.body.velocity.x -=20;
	    	py += 50;
    	};

    	wreckingballs = game.add.physicsGroup();
   		var wy = -300;
    	for (var i = 5; i < 50; i++) {
	    	var wreckingball = wreckingballs.create(game.world.randomX, wy, 'wreckingball');
	    	wreckingball.body.velocity.y = game.rnd.between(80,100);
	    	wreckingball.body.velocity.x -=20;
	    	wy += 50;
    	};

    	scoreText = game.add.text(game.world.centerX - 400, game.world.centerY - 270, 'score: 0', {font: '34px Consolas', fill: '#000000'});
	},

	update:function(){
	 	purplebird.body.velocity.y = 0;
	 	purplebird.body.velocity.x = 0;
	 	city.tilePosition.x -=2;

	 	if(cursors.up.isDown)
	 	{
	 		purplebird.body.velocity.y =  -150;
	 	}
	 	if(cursors.down.isDown)
	 	{
	 		purplebird.body.velocity.y = 150;
	 	}
	 	if(cursors.right.isDown)
	 	{
	 		purplebird.body.velocity.x = 150;
	 	}
	 	if(cursors.left.isDown)
	 	{
	 		purplebird.body.velocity.x = -200;
	 	}

	 	game.physics.arcade.collide(purplebird, coins, this.destroySprite, null, this);
    },

    //function collisionHandler (purplebird, coins) {

    //  If the player collides with a chilli it gets eaten :)
    //coins.kill();}
	destroySprite:function() {
// 		//coins.kill
		score +=20;
    	scoreText.text = 'score:  ' + score;
		this.game.state.start("scoreUp");
	}
};

var scoreUp = {
	preload:function(){
		game.load.image('city' , "assets/city.png");
		game.load.image('purplebird' , "assets/purplebird.jpg");
		game.load.image('coin', "assets/coin.png");
		game.load.image('plane', "assets/plane.jpg");
		game.load.image('wreckingball', "assets/wreckingball.jpg");
		game.load.image('gentri', "assets/gentri.png");
		score +=20;
    	scoreText.text = 'score:  ' + score;
	},

	create:function(){
		city = game.add.tileSprite(0,0,831,600,'city');
		gentri = game.add.tileSprite(game.world.centerX-405, game.world.centerY+220, 70, 70, 'gentri');
		purplebird = game.add.sprite(game.world.centerX - 250,game.world.centerY - 100, "purplebird");
		game.physics.enable(purplebird,Phaser.Physics.ARCADE);
		cursors = game.input.keyboard.createCursorKeys();

		coins = game.add.physicsGroup();
   		var y = -300;
    	for (var i = 5; i < 100; i++) {
	    	var coin = coins.create(game.world.randomX, y, 'coin');
	    	coin.body.velocity.y = game.rnd.between(80,100);
	    	coin.body.velocity.x -=20;
	    	y += 50;
    	};

    	planes = game.add.physicsGroup();
    	var py = - 300;
    	for (var i = 5; i < 50; i++) {
	    	var plane = planes.create(game.world.randomX, py, 'plane');
	    	plane.body.velocity.y = game.rnd.between(80,100);
	    	plane.body.velocity.x -=20;
	    	py += 50;
    	};

    	wreckingballs = game.add.physicsGroup();
   		var wy = -300;
    	for (var i = 5; i < 50; i++) {
	    	var wreckingball = wreckingballs.create(game.world.randomX, wy, 'wreckingball');
	    	wreckingball.body.velocity.y = game.rnd.between(80,100);
	    	wreckingball.body.velocity.x -=20;
	    	wy += 50;
    	};

    	scoreText = game.add.text(game.world.centerX - 400, game.world.centerY - 270, 'score: 0', {font: '34px Consolas', fill: '#000000'});
	},

	update:function(){
	 	purplebird.body.velocity.y = 0;
	 	purplebird.body.velocity.x = 0;
	 	city.tilePosition.x -=2;

	 	if(cursors.up.isDown)
	 	{
	 		purplebird.body.velocity.y =  -150;
	 	}
	 	if(cursors.down.isDown)
	 	{
	 		purplebird.body.velocity.y = 150;
	 	}
	 	if(cursors.right.isDown)
	 	{
	 		purplebird.body.velocity.x = 150;
	 	}
	 	if(cursors.left.isDown)
	 	{
	 		purplebird.body.velocity.x = -200;
	 	}

	 	this.game.physics.arcade.collide(purplebird, coins, this.destroySprite, null, this);
	},
	
	destroySprite:function() {
		this.game.state.start("scoreUp");
	}
	//preload:function(){
		// score +=20;
  //   	scoreText.text = 'score:  ' + score;
    	//coins.y = -100;
    
};

var lostState = {
	preload:function(){
		game.load.image('endscreen' , "assets/endscreen.png");
		game.load.image('heart', "assets/heart.png");
		game.load.image('gentri', "assets/gentri.png");
	},

	create:function(){
	 	inst2 = game.add.tileSprite(0,0,831,600,'endscreen');
	 	gentri = game.add.tileSprite(game.world.centerX-405, game.world.centerY+220, 70, 70, 'gentri');
	 	var heart = this.game.add.button(game.world.centerX-70, game.world.centerY+155, "heart",this.playnow, this);
	
	},
	
	playnow:function(){
		this.game.state.start("playState");
	}
};

var wonState = {
	preload:function(){
		game.load.image('winscreen' , "assets/winscreen.png");
		game.load.image('heart', "assets/heart.png");
		game.load.image('gentri', "assets/gentri.png");
	},

	create:function(){
	 	inst2 = game.add.tileSprite(0,0,831,600,'winscreen');
	 	gentri = game.add.tileSprite(game.world.centerX-405, game.world.centerY+220, 70, 70, 'gentri');
	 	var heart = this.game.add.button(game.world.centerX-70, game.world.centerY+155, "heart",this.playnow, this);
	
	},
	
	playnow:function(){
		this.game.state.start("playState");
	}
}
 
game.state.add('mainState',mainState);
game.state.start('mainState',mainState);
game.state.add('instructionState',instructionState);
game.state.add('instructionState2',instructionState2);
game.state.add('instructionState3',instructionState3);
game.state.add('playState',playState);
game.state.add('scoreUp',scoreUp);
game.state.add('lostState',lostState);
game.state.add('wonState',wonState);
