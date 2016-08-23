var game = new Phaser.Game(831,600,Phaser.CANVAS, 'gameDiv');
var city;
var purplebird;
var cursors;
var inst1;
var inst2;
var coin;
var plane;
var wreckingball;
var collisionHandler;
var destroySprite;
var gentri;
var score = 0;
var scoreText;
var music;
var mainState = {
	preload:function(){
		game.load.image('city' , "assets/city.png");
		game.load.image('startgame', "assets/start.png");
		game.load.image('gentri', "assets/gentri.png");
	},
	create:function(){
	 	city = game.add.tileSprite(0,0,831,600,'city');
	 	gentri = game.add.tileSprite(game.world.centerX - 405, game.world.centerY + 220, 70, 70, 'gentri');
	 	var startgame = this.game.add.button(game.world.centerX - 100, game.world.centerY - 100, "startgame",this.playTheGame, this);
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
	 	gentri = game.add.tileSprite(game.world.centerX - 405, game.world.centerY + 220, 70, 70, 'gentri');
	 	var next = this.game.add.button(game.world.centerX + 270, game.world.centerY + 180, "next",this.gonext, this);	
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
	 	gentri = game.add.tileSprite(game.world.centerX - 405, game.world.centerY + 220, 70, 70, 'gentri');
	 	var next = this.game.add.button(game.world.centerX + 270, game.world.centerY + 180, "next",this.playnow, this);
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
	 	gentri = game.add.tileSprite(game.world.centerX - 405, game.world.centerY + 220, 70, 70, 'gentri');
	 	var next = this.game.add.button(game.world.centerX + 270, game.world.centerY + 180, "next",this.playnow, this);
	},
	playnow:function(){
		this.game.state.start("selectState");
	}
};
var selectState = {
	preload:function(){
		game.load.image('character', "assets/character.png");
		game.load.image('purplebird', "assets/purplebird.jpg");
		game.load.image('greenbird', "assets/greenbird.jpg");
	},
	create:function(){
		character = game.add.tileSprite(0,0,831,601,'character');
	 	gentri = game.add.tileSprite(game.world.centerX - 405, game.world.centerY + 220, 70, 70, 'gentri');
	 	var purplebird = this.game.add.button(game.world.centerX + 100, game.world.centerY, "purplebird", this.purple, this);
	 	purplebird.scale.setTo(2, 2);
	 	var greenbird = this.game.add.button(game.world.centerX - 250, game.world.centerY, "greenbird", this.green, this);
		greenbird.scale.setTo(2, 2);
	},
	purple:function(){
		this.game.state.start("purpleState");
	},
	green:function(){
		this.game.state.start("greenState");
	}
};
var purpleState = {
	preload:function(){
		game.load.image('city' , "assets/city.png");
		game.load.image('purplebird' , "assets/purplebird.jpg");
		game.load.image('coin', "assets/coin.png");
		game.load.image('plane', "assets/plane.jpg");
		game.load.image('wreckingball', "assets/wreckingball.jpg");
		game.load.image('gentri', "assets/gentri.png");
		game.load.audio('coinsound', "assets/coinsound.ogg");
		game.load.audio('failsound', "assets/failsound.ogg");
	},
	create:function(){
		city = game.add.tileSprite(0,0,831,600,'city');
		gentri = game.add.tileSprite(game.world.centerX-405, game.world.centerY+220, 70, 70, 'gentri');
		wreckingballs = game.add.physicsGroup();
	  	wreckingball = wreckingballs.create(game.world.centerX - 290, game.world.centerY + 50, "wreckingball" );
		wreckingball2 = wreckingballs.create(game.world.centerX - 50, game.world.centerY + 50, "wreckingball");
		wreckingball3 = wreckingballs.create(game.world.centerX + 195, game.world.centerY + 50, "wreckingball");
		purplebird = game.add.sprite(game.world.centerX - 250, game.world.centerY - 100, "purplebird");
		game.physics.enable(purplebird,Phaser.Physics.ARCADE);
		cursors = game.input.keyboard.createCursorKeys();
		coinsound = game.add.audio('coinsound');
		failsound = game.add.audio('failsound');

		coins = game.add.physicsGroup();
    	for (var i = 0; i < 10; i++) {
	    	var coin = coins.create(game.world.randomX, -200, 'coin');
	    	coin.body.velocity.y = game.rnd.between(80,100);
	    	coin.body.velocity.x -=20;
    	};

    	planes = game.add.physicsGroup();
    	for (var i = 0; i < 3; i++) {
	    	var plane = planes.create(game.world.randomX, -400, 'plane');
	    	plane.body.velocity.y = game.rnd.between(80,100);
	    	plane.body.velocity.x -=20;
    	};

    	scoreText = game.add.text(game.world.centerX - 400, game.world.centerY - 270, 'score: 0', {font: '34px Consolas', fill: '#000000'});
	},

	update:function(){
	 	purplebird.body.velocity.y = 0;
	 	purplebird.body.velocity.x = 0;
	 	city.tilePosition.x -=2;
		coins.forEach(checkPos, this);
    	function checkPos(coin) {
			if (coin.y > 600){
	      		coin.y = -200;
	        	coin.x = game.world.randomX;
	    	}
	    }
	    planes.forEach(checkPos, this);
	    function checkPos(plane) {
			if (plane.y > 600){
	      		plane.y = -200;
	        	plane.x = game.world.randomX;
	        }	
    	}

	 	if(cursors.up.isDown)
	 	{purplebird.body.velocity.y =  -150;}
	 	if(cursors.down.isDown)
	 	{purplebird.body.velocity.y = 150;}
	 	if(cursors.right.isDown)
	 	{purplebird.body.velocity.x = 150;}
	 	if(cursors.left.isDown)
	 	{purplebird.body.velocity.x = -200;}
	 	if (score >= 2372)
	 	{this.game.state.start("wonState");}
	 	if (score <= -1)
	 	{this.game.state.start("lostState");}

	 	game.physics.arcade.overlap(purplebird, coins, collisionHandler, null, this);
	 	game.physics.arcade.overlap(purplebird, wreckingballs, wreckball, null, this);
	 	game.physics.arcade.overlap(purplebird, planes, hitplane, null, this);
    },
};
	function collisionHandler(purplebird, coins){
		score +=40;
		scoreText.text = 'score:  ' + score;
		coins.y = -100;
		coins.x = game.world.randomX;
		coinsound.play();
	}

	function wreckball (purplebird, wreckingballs){
		failsound.play();
		purplebird.body.position.x = game.world.centerX - 250;
		purplebird.body.position.y = game.world.centerY - 100;
		setTimeout (1000);
		score -=20;
		scoreText.text = 'score:  ' + score;
	}

	function hitplane (purplebird, planes){
		score -=20;
		scoreText.text = 'score:  ' + score;
		planes.y = -100;
		planes.x = game.world.randomX;
		failsound.play();
    }

var greenState = {
	preload:function(){
		game.load.image('city' , "assets/city.png");
		game.load.image('greenbird' , "assets/greenbird.jpg");
		game.load.image('coin', "assets/coin.png");
		game.load.image('plane', "assets/plane.jpg");
		game.load.image('wreckingball', "assets/wreckingball.jpg");
		game.load.image('gentri', "assets/gentri.png");
		game.load.audio('coinsound', "assets/coinsound.ogg");
		game.load.audio('failsound', "assets/failsound.ogg");
	},

	create:function(){
		city = game.add.tileSprite(0,0,831,600,'city');
		gentri = game.add.tileSprite(game.world.centerX-405, game.world.centerY+220, 70, 70, 'gentri');
		gentri = game.add.tileSprite(game.world.centerX-405, game.world.centerY+220, 70, 70, 'gentri');
		wreckingballs = game.add.physicsGroup();
		wreckingball = wreckingballs.create(game.world.centerX + 100, game.world.centerY + 50, "wreckingball" );
		wreckingball2 = wreckingballs.create(game.world.centerX - 50, game.world.centerY + 50, "wreckingball");
		wreckingball3 = wreckingballs.create(game.world.centerX + 266, game.world.centerY + 50, "wreckingball");
		wreckingball4 = wreckingballs.create(game.world.centerX - 216, game.world.centerY + 50, "wreckingball");
		wreckingball5 = wreckingballs.create(game.world.centerX - 382, game.world.centerY + 50, "wreckingball");
		greenbird = game.add.sprite(game.world.centerX - 250, game.world.centerY - 100, "greenbird");
		game.physics.enable(greenbird,Phaser.Physics.ARCADE);
		cursors = game.input.keyboard.createCursorKeys();
		coinsound = game.add.audio('coinsound');
		failsound = game.add.audio('failsound');

		coins = game.add.physicsGroup();
    	for (var i = 0; i < 8; i++) {
	    	var coin = coins.create(game.world.randomX, -200, 'coin');
	    	coin.body.velocity.y = game.rnd.between(80,100);
	    	coin.body.velocity.x -=20;
    	};

    	planes = game.add.physicsGroup();
    	for (var i = 0; i < 5; i++) {
	    	var plane = planes.create(game.world.randomX, -400, 'plane');
	    	plane.body.velocity.y = game.rnd.between(80,100);
	    	plane.body.velocity.x -=20;
    	};

    	scoreText = game.add.text(game.world.centerX - 400, game.world.centerY - 270, 'score: 0', {font: '34px Consolas', fill: '#000000'});
	},

	update:function(){
	 	greenbird.body.velocity.y = 0;
	 	greenbird.body.velocity.x = 0;
	 	city.tilePosition.x -=2;
		coins.forEach(checkPos, this);
    	function checkPos(coin) {
			if (coin.y > 600){
	      		coin.y = -200;
	        	coin.x = game.world.randomX;
	    	}
	    }
	    planes.forEach(checkPos, this);
	    function checkPos(plane) {
			if (plane.y > 600){
	      		plane.y = -200;
	        	plane.x = game.world.randomX;
	        }	
    	}

	 	if(cursors.up.isDown)
	 	{greenbird.body.velocity.y =  -150;}
	 	if(cursors.down.isDown)
	 	{greenbird.body.velocity.y = 150;}
	 	if(cursors.right.isDown)
	 	{greenbird.body.velocity.x = 150;}
	 	if(cursors.left.isDown)
	 	{greenbird.body.velocity.x = -200;}
	 	if (score >= 2372)
	 	{this.game.state.start("wonState");}
	 	if (score <= -1)
	 	{this.game.state.start("lostState");}

	 	game.physics.arcade.overlap(greenbird, coins, collisionHandler2, null, this);
	 	game.physics.arcade.overlap(greenbird, wreckingballs, wreckball2, null, this);
	 	game.physics.arcade.overlap(greenbird, planes, hitplane2, null, this);
    },
}
	function collisionHandler2(greenbird, coins){
		coinsound.play();
		score +=20;
		scoreText.text = 'score:  ' + score;
		coins.y = -100;
		coins.x = game.world.randomX;
	}

	function wreckball2 (greenbird, wreckingballs){
		greenbird.body.position.x = game.world.centerX - 250;
		greenbird.body.position.y = game.world.centerY - 100;
		setTimeout (1000);
		score -=40;
		scoreText.text = 'score:  ' + score;
		failsound.play();
	}

	function hitplane2 (greenbird, planes){
		score -=40;
		scoreText.text = 'score:  ' + score;
		planes.y = -100;
		planes.x = game.world.randomX;
		failsound.play();
    }

var lostState = {
	preload:function(){
		game.load.image('endscreen' , "assets/endscreen.png");
		game.load.image('gentri', "assets/gentri.png");
		game.load.image('next', "assets/next.png");
		game.load.audio('failend', "assets/failend.ogg");
	},

	create:function(){
		failend = game.add.audio('failend');
		failend.play();
	 	endscreen = game.add.tileSprite(0,0,831,600,'endscreen');
	 	gentri = game.add.tileSprite(game.world.centerX - 405, game.world.centerY + 220, 70, 70, 'gentri');
	 	var next = this.game.add.button(game.world.centerX + 270, game.world.centerY + 180, "next",this.startinfo, this);
	},
	
	startinfo:function(){
		this.game.state.start("infoState");
	}
};

var wonState = {
	preload:function(){
		game.load.image('winscreen', "assets/winscreen.png");
		game.load.image('gentri', "assets/gentri.png");
		game.load.image('next', "assets/next.png");
		game.load.audio('winend', "assets/winend.ogg");
	},

	create:function(){
		winend = game.add.audio('winend');
		winend.play();
	 	winscreen = game.add.tileSprite(0,0,831,600,'winscreen');
	 	gentri = game.add.tileSprite(game.world.centerX - 405, game.world.centerY + 220, 70, 70, 'gentri');
	 	var next = this.game.add.button(game.world.centerX + 270, game.world.centerY + 180, "next",this.startinfo, this);
	},
	
	startinfo:function(){
		this.game.state.start("infoState");
	}
};

var infoState = {
	preload:function(){
		game.load.image('info1', "assets/info1.png");
		game.load.image('next', "assets/next.png");
		game.load.image('gentri', "assets/gentri.png");
		game.load.image('info2', "assets/info2.png");
		game.load.image('info3', "assets/info3.png");
		game.load.image('info4', "assets/info4.png");
		game.load.image('info5', "assets/info5.png");
		game.load.image('heart', "assets/heart.png");
	},

	create:function(){
		info1 = game.add.tileSprite(0,0,831,600,'info1');
	 	gentri = game.add.tileSprite(game.world.centerX - 405, game.world.centerY + 220, 70, 70, 'gentri');
 		var next = this.game.add.button(game.world.centerX + 270, game.world.centerY + 180, "next",this.info2, this);
	},

	info2:function(){
		info2 = game.add.tileSprite(0,0,831,600,'info2');
	 	gentri = game.add.tileSprite(game.world.centerX - 405, game.world.centerY + 220, 70, 70, 'gentri');
 		var next = this.game.add.button(game.world.centerX + 270, game.world.centerY + 180, "next",this.info3, this);
	},

	info3:function(){
		info3 = game.add.tileSprite(0,0,831,600,'info3');
	 	gentri = game.add.tileSprite(game.world.centerX - 405, game.world.centerY + 220, 70, 70, 'gentri');
 		var next = this.game.add.button(game.world.centerX + 270, game.world.centerY + 180, "next",this.info4, this);
	},

	info4:function(){
		info4 = game.add.tileSprite(0,0,831,600,'info4');
	 	gentri = game.add.tileSprite(game.world.centerX - 405, game.world.centerY + 220, 70, 70, 'gentri');
 		var next = this.game.add.button(game.world.centerX + 270, game.world.centerY + 180, "next",this.info5, this);
	},

	info5:function(){
		info5 = game.add.tileSprite(0,0,831,600,'info5');
	 	gentri = game.add.tileSprite(game.world.centerX - 405, game.world.centerY + 220, 70, 70, 'gentri');
 		var heart = this.game.add.button(game.world.centerX - 70, game.world.centerY + 125, "heart",this.playnow, this);
	},

	playnow:function(){
		score=0;
		this.game.state.start("selectState");
	}
};
 
game.state.add('mainState',mainState);
game.state.start('mainState',mainState);
game.state.add('instructionState',instructionState);
game.state.add('instructionState2',instructionState2);
game.state.add('instructionState3',instructionState3);
game.state.add('selectState',selectState);
game.state.add('greenState',greenState);
game.state.add('purpleState',purpleState);
game.state.add('lostState',lostState);
game.state.add('wonState',wonState);
game.state.add('infoState',infoState);

