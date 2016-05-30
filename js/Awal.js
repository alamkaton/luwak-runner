var LuwakRunnerGame = LuwakRunnerGame || {};

//title screen
LuwakRunnerGame.Awal = function () {};

LuwakRunnerGame.Awal.prototype =
{
    init: function (score) 
    {
        var score         = score || 0;
        this.highestScore = this.highestScore || 0;

        this.highestScore = Math.max(score, this.highestScore);
    },
	
	preload: function()
	{
		//load game assets
		this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('gameTiles', 'assets/images/terrains.png');
		//this.load.image('greencup', 'assets/images/greencup.png');
		//this.load.image('bluecup', 'assets/images/bluecup.png');
		
		this.load.image('jawa', 'assets/images/jawa.png');
		this.load.image('toraja', 'assets/images/toraja.png');
		this.load.image('wamena', 'assets/images/wamena.png');
		this.load.image('gula', 'assets/images/gula.png');
		//sthis.load.image('player', 'assets/images/player.png');
		this.load.spritesheet('player', 'assets/images/luwak.png',35,48); //tambahan saya
		this.load.spritesheet('enemy', 'assets/images/enemy.png',44,63);
		//this.load.spritesheet('gula', 'assets/images/gula.png',10,11); //tambahan saya
		this.load.image('browndoor', 'assets/images/door.png');
		this.load.image('playerParticle', 'assets/images/player-particle.png');
        this.load.audio('collect', 'assets/audio/collect.ogg');
        this.load.audio('explosion', 'assets/audio/explosion.ogg');
		
	},
    
    create: function () 
    {
		this.backsound = this.game.add.audio('suara');
		this.backsound.play();
        //show the space tile, repeated  (position x, position y, width, height, assets key)
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    
        //give it speed in x
        //this.background.autoScroll(-20, 0);

        //text for start game
    	var text  = "Saya pesan es kopi jawa";
        var style = { font: "30px Arial", fill: "#2c2626", align: "center" };
        var a     = this.game.add.text(this.game.width/2 -175, this.game.height/2 - 150, text, style);
        a.anchor.set(0.5);
		
		var text  = "Tap to begin";
        var style = { font: "30px Arial", fill: "#fff", align: "center" };
        var t     = this.game.add.text(this.game.width/2 -175, this.game.height/2 + 100, text, style);
        t.anchor.set(0.5);

        //highest score
        text  = "Highest score: "+this.highestScore;
        style = { font: "15px Arial", fill: "#fff", align: "center" };
  
        var h = this.game.add.text(this.game.width/2 - 175, this.game.height/2 + 150, text, style);
        h.anchor.set(0.5);
    },
    
    update: function () 
    {
        if (this.game.input.activePointer.justPressed())
        {
            this.game.state.start('Game');
        }
    }
};