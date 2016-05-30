var LuwakRunnerGame = LuwakRunnerGame || {};

LuwakRunnerGame.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

LuwakRunnerGame.game.state.add('Boot', LuwakRunnerGame.Boot);			
LuwakRunnerGame.game.state.add('Preload', LuwakRunnerGame.Preload);   
LuwakRunnerGame.game.state.add('Awal', LuwakRunnerGame.Awal);
LuwakRunnerGame.game.state.add('Game', LuwakRunnerGame.Game);
LuwakRunnerGame.game.state.add('Hasil', LuwakRunnerGame.Hasil);
LuwakRunnerGame.game.state.add('GameB', LuwakRunnerGame.GameB);

LuwakRunnerGame.game.state.start('Boot');