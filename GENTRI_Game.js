var game = new Phaser.Game(832,600,Phaser.CANVAS, 'gameDiv');

var city;
var purplebird;
var cursors;
var start;
var next;
var inst1;
var inst2;
var mainState = {
	preload:function(){
		game.load.image('city' , "assets/city.png");
		game.load.image('start', "assets/start.png");
	},

	create:function(){
	 	city = game.add.tileSprite(0,0,832,600,'city');
	 	var start = this.game.add.button(game.world.centerX-100, game.world.centerY-100, "start",this.playTheGame, this);
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
	},

	create:function(){
	 	inst1 = game.add.tileSprite(0,0,832,600,'inst1');
	 	var next = this.game.add.button(game.world.centerX+250, game.world.centerY+180, "next",this.gonext, this);
	
	},
	
	gonext:function(){
		this.game.state.start("instructionState2");
	}
};

var instructionState2 = {
	preload:function(){
		game.load.image('inst2' , "assets/inst2.png");
		game.load.image('next', "assets/next.png");
	},

	create:function(){
	 	inst2 = game.add.tileSprite(0,0,832,600,'inst2');
	 	var next = this.game.add.button(game.world.centerX+250, game.world.centerY+180, "next",this.playnow, this);
	
	},
	
	playnow:function(){
		this.game.state.start("playState");
	}
};

var playState = {
	preload:function(){
		game.load.image('city' , "assets/city.png");
		game.load.image('purplebird' , "assets/purplebird.jpg");
	},

	create:function(){
		city = game.add.tileSprite(0,0,832,600,'city');
		purplebird = game.add.sprite(game.world.centerX - 250,game.world.centerY - 100, "purplebird");
		game.physics.enable(purplebird,Phaser.Physics.ARCADE);
		cursors = game.input.keyboard.createCursorKeys();
	},

	update:function(){
	 	purplebird.body.velocity.y = 0;
	 	city.tilePosition.x -=2;

	 	if(cursors.up.isDown)
	 	{
	 		purplebird.body.velocity.y =  -150;
	 	}
	 	if(cursors.down.isDown)
	 	{
	 		purplebird.body.velocity.y = 150;
	 	}
	}
};

game.state.add('mainState',mainState);
game.state.start('mainState');
game.state.add('instructionState',instructionState);
game.state.add('instructionState2',instructionState2);
game.state.add('playState',playState);