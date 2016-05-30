var LuwakRunnerGame = LuwakRunnerGame || {};

//title screen
LuwakRunnerGame.GameB = function(){};

LuwakRunnerGame.GameB.prototype = {
  

	
	create: function() {
    	this.map = this.game.add.tilemap('level2');

		//the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
		this.map.addTilesetImage('terrains', 'gameTiles');

		//create layer
		this.backgroundlayer = this.map.createLayer('backgroundLayer');
		this.blockedLayer = this.map.createLayer('blockedLayer');
		this.blockedLayer.immovable = true;
		
		//collision on blockedLayer
		this.map.setCollisionBetween(1, 16, true, 'blockedLayer');

		//resizes the game world to match the layer dimensions
		this.backgroundlayer.resizeWorld();

		//this.createItems1();
		//this.createItems2();
		//this.createItems3();
		//this.createItems();
		//this.createDoors();

		//create player
		/*var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
		this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
		this.player.animations.add('run_left', [0, 1, 2, 3], 10, true);   //tambahan saya
		this.player.animations.add('run_right', [5, 6, 7, 8], 10, true);   //tambahan saya
		this.player.animations.add('run_up', [9,10], 10, true);
		this.player.animations.add('run_down', [11,12], 10, true);
		this.game.physics.arcade.enable(this.player);
		this.playerSpeed = 100;   //tambahan saya
		
    	//the camera will follow the player in the world
		this.game.camera.follow(this.player);*/

		//sounds
        this.explosionSound = this.game.add.audio('explosion');
        console.log(this.explosionSound);
        this.collectSound = this.game.add.audio('collect');

		
		//move player with cursor keys
		this.cursors = this.game.input.keyboard.createCursorKeys();
		
		this.playerScore1 = 0;
		this.playerScore2 = 0;
		this.playerScore3 = 0;
		this.playerScore = 0;
		this.showLabels();
		
		//tambaha saya
		this.createEnemy();
		//gula.body.gravity.y = 30;
	},
	
	createEnemy: function()
	{
		this.enemy = this.game.add.group();
		this.enemy.enableBody = true;
		this.enemy.physicsBodyType = Phaser.Physics.ARCADE;
		//gula = this.gula.create(this.game.world.randomX, this.game.world.randomY, 'gula');
		this.enemy = this.enemy.create(900, 180, 'enemy');
		this.enemy.animations.add('gerak', [5, 6, 7, 8], 7, true);
		this.enemy.animations.play('gerak');
		
	},

//	createItems1: function() {
//		//create items
//		this.items1 = this.game.add.group();
//		this.items1.enableBody = true;
//		var item1;
//		result = this.findObjectsByType('item1', this.map, 'objectsLayer');
//		result.forEach(function(element){
//			this.createFromTiledObject(element, this.items1);
//		}, this);
//	},
	
	createItems2: function() {
		//create items
		this.items2 = this.game.add.group();
		this.items2.enableBody = true;
		var item2;
		result = this.findObjectsByType('item2', this.map, 'objectsLayer');
		result.forEach(function(element){
			this.createFromTiledObject(element, this.items2);
		}, this);
	},
	
	createItems3: function() {
		//create items
		this.items3 = this.game.add.group();
		this.items3.enableBody = true;
		var item3;
		result = this.findObjectsByType('item3', this.map, 'objectsLayer');
		result.forEach(function(element){
			this.createFromTiledObject(element, this.items3);
		}, this);
	},
	
	createItems: function() {
		//create items
		this.items = this.game.add.group();
		this.items.enableBody = true;
		var item;
		result = this.findObjectsByType('item', this.map, 'objectsLayer');
		result.forEach(function(element){
			this.createFromTiledObject(element, this.items);
		}, this);
	},
	
	createDoors: function() {
    	//create doors
		this.doors = this.game.add.group();
		this.doors.enableBody = true;
		result = this.findObjectsByType('door', this.map, 'objectsLayer');

		result.forEach(function(element){
			this.createFromTiledObject(element, this.doors);
		}, this);
	},

	//find objects in a Tiled layer that containt a property called "type" equal to a certain value
	findObjectsByType: function(type, map, layer) {
    	var result = new Array();
    	map.objects[layer].forEach(function(element){
			if(element.properties.type === type) {
				//Phaser uses top left, Tiled bottom left so we have to adjust
				//also keep in mind that the cup images are a bit smaller than the tile which is 16x16
				//so they might not be placed in the exact position as in Tiled
				element.y -= map.tileHeight;
				result.push(element);
			}
		});
		return result;
	},

	//create a sprite from an object
	createFromTiledObject: function(element, group) {
    	var sprite = group.create(element.x, element.y, element.properties.sprite);

		//copy all properties to the sprite
		Object.keys(element.properties).forEach(function(key){
			sprite[key] = element.properties[key];
		});
  	},
  
	/*update: function() {
    	//collision
		this.game.physics.arcade.collide(this.player, this.blockedLayer);
		//this.game.physics.arcade.collide(this.enemy, this.blockedLayer, this.rubahArah1, null, this);
		this.game.physics.arcade.collide(this.player, this.enemy, this.hitSianida, null, this);
		//this.game.physics.arcade.collide(this.gula, this.blockedLayer);//tambahan saya
		this.game.physics.arcade.overlap(this.player, this.items1, this.collect1, null, this);
		this.game.physics.arcade.overlap(this.player, this.items2, this.collect2, null, this);
		this.game.physics.arcade.overlap(this.player, this.items3, this.collect3, null, this);
		this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
		this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);
		
		
		//player movement

		//tambahan saya
		if (this.game.input.activePointer.justPressed()) {
            //move on the direction of the input
            this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
		}
		
		if (this.player.body.velocity.x < 0){
			this.player.animations.play('run_left');
		}
		else if(this.player.body.velocity.x > 0){
			this.player.animations.play('run_right');
		}
		else if(this.player.body.velocity.y > 0)
		{
			this.player.animations.play('run_up');
		}
		else if(this.player.body.velocity.y < 0)
		{
			this.player.animations.play('run_down');
		}
		else
		{
			this.player.animations.stop();
			this.player.frame = 4;
		}
		
		
		/*this.player.body.velocity.x = 0;

		
		if(this.cursors.up.isDown)
		{
		  if(this.player.body.velocity.y == 0)
		  this.player.body.velocity.y -= 50;
		}
		else if(this.cursors.down.isDown)
		{
		  if(this.player.body.velocity.y == 0)
		  this.player.body.velocity.y += 50;
		}
		else
		{
		  this.player.body.velocity.y = 0;
		}

		if(this.cursors.left.isDown)
		{
		  this.player.body.velocity.x -= 50;
		}
		else if(this.cursors.right.isDown)
		{
		  this.player.body.velocity.x += 50;
		}*/
	//},*/
	
	collect1: function(player, collectable) {
		console.log('yummy!1');
        this.collectSound.play();

		this.playerScore1++;
        this.scoreLabel1.text = this.playerScore1;
		
    	//remove sprite
		collectable.destroy();
	},
	
	collect2: function(player, collectable) {
		console.log('yummy!2');
		this.collectSound.play();
		
		this.playerScore2++;
        this.scoreLabel2.text = this.playerScore2;
		
    	//remove sprite
		collectable.destroy();
	},
	
	collect3: function(player, collectable) {
		console.log('yummy!3');
		this.collectSound.play();
		
		this.playerScore3++;
        this.scoreLabel3.text = this.playerScore3;
		
    	//remove sprite
		collectable.destroy();
	},
  
	collect: function(player, collectable) {
		console.log('yummy!');
		this.collectSound.play();
		
		this.playerScore++;
        this.scoreLabel.text = this.playerScore;
		
    	//remove sprite
		collectable.destroy();
	},
	
	enterDoor: function(player, door) {
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
		this.game.state.start('Hasil', true, false, this.playerScore1, this.playerScore2, this.playerScore3, this.playerScore);
  	},
	
	showLabels: function () 
    {
		var level = 2;
		var textLevel = "Level: "+level;
        //score text
        var text1 = "0";
		var text2 = "0";
		var text3 = "0";
		var text = "0";
		
        var style = { font: "20px Arial", fill: "#fff", align: "center" };
		
		this.levelLabel = this.game.add.text(this.game.width-550, this.game.height - 50, textLevel, style);
        this.levelLabel.fixedToCamera = true;
		
        this.scoreLabel1 = this.game.add.text(this.game.width-400, this.game.height - 50, text1, style);
        this.scoreLabel1.fixedToCamera = true;
		
		this.scoreLabel2 = this.game.add.text(this.game.width-300, this.game.height - 50, text2, style);
        this.scoreLabel2.fixedToCamera = true;
		
		this.scoreLabel3 = this.game.add.text(this.game.width-200, this.game.height - 50, text3, style);
        this.scoreLabel3.fixedToCamera = true;
		
		this.scoreLabel = this.game.add.text(this.game.width-100, this.game.height - 50, text, style);
        this.scoreLabel.fixedToCamera = true;
    },
	
	hitSianida: function ()
	{
		//play explosion sound
        this.explosionSound.play();

        //make the player explode
        var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
        emitter.makeParticles('playerParticle');
        emitter.minParticleSpeed.setTo(-200, -200);
        emitter.maxParticleSpeed.setTo(200, 200);
        emitter.gravity = 0;
		//When starting the emitter, the first “true” parameter is because this
		//will be a single particle emission (a single explosion), which will
		//last 1 second (1000 milliseconds), then we put null because that’s also
		//for repeating emissions (it defines how many per emission), lastly we’ll
		//send 100 particles on this single explosion
        emitter.start(true, 1000, null, 100);
        this.player.kill();

		//Kill the player sprite as well and call a gameOver method after 0.8 seconds (800 milliseconds)s
        this.game.time.events.add(800, this.gameOver, this);
	},
	
	gameOver: function () 
    {
        //pass it the score as a parameter 
        this.game.state.start('Awal', true, false, this.playerScore1);
    },
};
