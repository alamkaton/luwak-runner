var LuwakRunnerGame = LuwakRunnerGame || {};

//loading the game assets
LuwakRunnerGame.Preload = function(){};

LuwakRunnerGame.Preload.prototype = {
	preload: function() {
		//show loading screen
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
		this.preloadBar.anchor.setTo(0.5);

		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('background', 'assets/images/back.png');
		this.load.audio('suara', 'assets/audio/kunang-kunang.mp3');
	},
	
	create: function() {
		this.state.start('Awal');
  	}
};