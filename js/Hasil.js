var LuwakRunnerGame = LuwakRunnerGame || {};

LuwakRunnerGame.Hasil = function(){};

LuwakRunnerGame.Hasil.prototype = {
	init: function(score1, score2, score3, score)
	{
		var score1         = score1 || 0;
		var score2         = score2 || 0;
		var score3         = score3 || 0;
		var score          = score || 0;
        //this.highestScore = this.highestScore || 0;
		this.benar = score1;
		this.salah = score2 + score3;
		this.tambahan = score;
        //this.highestScore = Math.max(score, this.highestScore);
		
		this.fuzzyfikasi1(this.benar);
		this.fuzzyfikasi2(this.salah);
	},
	
	preload: function()
	{
		this.load.tilemap('level2', 'assets/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('gameTiles', 'assets/images/terrains.png');
		
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
        //show the space tile, repeated  (position x, position y, width, height, assets key)
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background2');
    
        //give it speed in x
        //this.background.autoScroll(-20, 0);

        //text for start game
        var textA  = "Kopi yang diinginkan:";
        var style = { font: "30px Arial", fill: "#fff", align: "center" };
        var t     = this.game.add.text(this.game.width/2, this.game.height/2 - 300, textA, style);
        t.anchor.set(0.5);

        //highest score
        //text  = "Highest score: "+this.highestScore;
        textA1	= "Kurang: "+this.kurang;
		style = { font: "15px Arial", fill: "#fff", align: "center" };  
        var h = this.game.add.text(this.game.width/2, this.game.height/2 - 250, textA1, style);
        h.anchor.set(0.5);
		
		textA2	= "Cukup: "+this.cukup;  
        var i = this.game.add.text(this.game.width/2, this.game.height/2 - 200, textA2, style);
        i.anchor.set(0.5);
		
		textA3	= "Banyak: "+this.banyak;  
        var j = this.game.add.text(this.game.width/2, this.game.height/2 - 150, textA3, style);
        j.anchor.set(0.5);
		
		textScore	= "Gula: "+this.tambahan;  
        var k = this.game.add.text(this.game.width/2, this.game.height/2 - 100,textScore, style);
        k.anchor.set(0.5);
		
		var textB  = "Kopi yang tidak diinginkan:";
        var style = { font: "30px Arial", fill: "#fff", align: "center" };
        var u     = this.game.add.text(this.game.width/2, this.game.height/2 - 50, textB, style);
        u.anchor.set(0.5);
		
		textB1	= "Sedikit: "+this.sedikit;
		style = { font: "15px Arial", fill: "#fff", align: "center" };  
        var l = this.game.add.text(this.game.width/2, this.game.height/2, textB1, style);
        l.anchor.set(0.5);
		
		textB2	= "Sedang: "+this.sedang;
        var m = this.game.add.text(this.game.width/2, this.game.height/2 + 50, textB2, style);
        m.anchor.set(0.5);
		
		textB3	= "Banyak: "+this.banyak2;
        var n = this.game.add.text(this.game.width/2, this.game.height/2 + 100, textB3, style);
        n.anchor.set(0.5);
		
		textB4	= "Terlalu banyak: "+this.terlaluBanyak; 
        var o = this.game.add.text(this.game.width/2, this.game.height/2 + 150, textB4, style);
        o.anchor.set(0.5);
		
		var textC  = "Tap to next Level";
        var style = { font: "30px Arial", fill: "#fff", align: "center" };
        var v     = this.game.add.text(this.game.width/2, this.game.height/2 + 200, textC, style);
        v.anchor.set(0.5);
    },
	
	update: function () 
    {
        if (this.game.input.activePointer.justPressed())
        {
            this.game.state.start('GameB', true, false);
            this.game.state.start('GameB', true, false);
        }
    },
	
	fuzzyfikasi1: function(input)
	{
		// buruk
		if (input <= 5) this.kurang = 1;
		if ((5 < input) && (input < 10))
		{
			this.kurang = (10 - input) / (10 - 5);
		}
		if (input >= 10) this.kurang = 0;
		
		//cukup
		if ((input <= 5) || (input >= 15)) this.cukup = 0;
		if ((5 < input) && (input <= 10))
		{
			this.cukup = (input - 5) / (10 - 5);
		}
		if ((10 <= input) && (input < 15))
		{
			this.cukup = (15 - input) / (15 -10);
		}
		
		//banyak
		if (input <= 10) this.banyak = 0;
		if ((10 < input) && (input <= 15))
		{
			this.banyak = (input - 10) / (15 - 10);
		}
		if (input >= 15) this.banyak = 1;
	},
	
	fuzzyfikasi2: function(input)
	{
		// sedikit
		if (input <= 3) this.sedikit = 1;
		if ((3 < input) && (input < 6))
		{
			this.sedikit = (6 - input) / (6 - 3);
		}
		if (input >= 6) this.sedikit = 0;
		
		//sedang
		if ((input <= 3) || (9 <= input)) this.sedang = 0;
		if ((3 < input) && (input <= 6))
		{
			this.sedang = (input - 3) / (6 - 3);
		}
		if ((6 <= input) && (input < 9))
		{
			this.sedang = (9 - input) / (9 -6);
		}
		
		//banyak2
		if ((input <= 6) || (12 <= input)) this.banyak2 = 0;
		if ((6 < input) && (input <= 9))
		{
			this.banyak2 = (input - 6) / (9 - 6);
 		}
		if ((9 <= input) && (input < 12))
		{
			this.banyak2 = (12 - input) / (12 - 9);
		}
		
		//terlaluBanyak
		if (input <= 9) this.terlaluBanyak = 0;
		if ((9 < input) && (input <= 12))
		{
			this.terlaluBanyak = (input - 9) / (12 - 9);
		}
		if (12 <= input) this.terlaluBanyak = 1;
	},
	
	mamdani: function()
	{
		/*if (0 < this.kurang) && (0 < this.sedikit) a = "KE";
		if (0 < this.kurang) && (0 < this.sedang) b = "KE";
		if (0 < this.kurang) && (0 < this.banyak2) c = "KE";
		if (0 < this.kurang) && (0 < this.terlaluBanyak) d = "KE";
		if (0 < this.cukup) && (0 < this.sedikit) f = "E";
		if (0 < this.cukup) && (0 < this.sedang) g = "KE";
		if (0 < this.cukup) && (0 < this.banyak2) h = "KE";
		if (0 < this.cukup) && (0 < this.terlaluBanyak) i = "KE";
		if (0 < this.banyak) && (0 < = this.sediki) j = "E";
		if (0 < this.banyak) && (0 < = this.sedang) k = "E";
		if (0 < this.banyak) && (0 < = this.banyak2) l = "KE";
		if (0 < this.banyak) && (0 < = this.terlaluBanyak) m = "KE";*/
		
	}
};