var game = new Phaser.Game(800,600,Phaser.CANVAS, 'gameDiv');

var city;
var purplebird;
var cursors;
var start;
var mainState = {
	preload:function(){

	game.load.image('city' , "assets/city.png");
	game.load.image('purplebird' , "assets/purplebird.jpg");
	game.load.gif('start', "assets/start.gif");
	},

	create:function(){
	 	city = game.add.tileSprite(0,0,800,600,'city');
	 	purplebird = game.add.sprite(game.world.centerX - 250,game.world.centerY - 100, "purplebird");
	 	game.physics.enable(purplebird,Phaser.Physics.ARCADE);
	 	cursors = game.input.keyboard.createCursorKeys();
	 	var start = this.game.add.button(game.world.centerX, game.world.centerY, "start",this.playTheGame, this);
	},

	playTheGame:function(){
		this.game.state.start("instructionState")
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

}

game.state.add('mainState',mainState);
game.state.start('mainState');
game.stare.add('instructionState',instructionState)