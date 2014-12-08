Player = function(game, x, y, speed){

  this.game = game;
  this.startX = x;
  this.startY = y;
  this.sprite = null;
  this.cursors = null;
  this.snowTimeStart = null;
  this.facing = null;
  this.snowTile = 13;
  this.speed = speed;
  this.moving = false;
  this.direction = {};
};

var DIRXY = [
  {x: -1, y: 0},
  {x: 1, y: 0},
  {x: 0, y: -1},
  {x: 0, y: 1 }
];

var DIR = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3
};


var randomInt = {};
update = function(){
    // game.physics.arcade.collide(player, tile_layer, removeTile);
};

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

Player.prototype = {

    getDir: function(DIRECTION) {
      return {x: DIRXY[DIR[DIRECTION]].x, y: DIRXY[DIR[DIRECTION]].y};
    },

    setDir: function(dir) {
       this.sprite.body.velocity.x = this.speed * dir.x;
       this.sprite.body.velocity.y = this.speed * dir.y;
      // this.emitter.minParticleSpeed.setTo(dir.x, 200);
      // this.emitter.maxParticleSpeed.setTo(dir.x + (50 * dir.y), 300);
    },

    snowAction: function(currentTile, layer, elapsedTime) {
      if (currentTile != this.snowTile) {
        // this.snowTimeStart = game.time.now;
        // this.emitter.start(false, 1000, null, 100);
        // level.map.fill(this.snowTile, layer[0].getTileX(this.sprite.x), layer[0].getTileY(this.sprite.y), 2, 2);
        // level.map.fill(148, layer[0].getTileX(this.sprite.x + randomInt.x), layer[0].getTileY(this.sprite.y - randomInt.y), 1, 1);

      } else {
        // if (elapsedTime > 500){
        //  this.emitter.on = false;
        // }
      }

    },

    preload: function () {
      //this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
      // this.game.load.image('snowflake', 'assets/snow_flake.png');
      this.game.load.image('right', 'assets/deathbot.png');
      this.game.load.image('up', 'assets/deathbot_up.png');
      this.game.load.image('down', 'assets/deathbot_down.png');

    },

    create: function () {
      this.sprite = new Phaser.Sprite(this.game,this.startX,this.startY,"right");
      this.game.physics.arcade.enable(this.sprite);
      this.sprite.body.collideWorldBounds = true;
      //this.game.world.addAt(this.sprite, 2);
      game.camera.follow(this.sprite);

      //  this.emitter = this.game.add.emitter(this.sprite.x, this.sprite.y, 100);
      //  this.emitter.makeParticles('snowflake');

      this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function(level, map) {
    // var layer = level.layer
      //console.log('Level', level.layer[3].layer);
    this.game.physics.arcade.collide(this.sprite, level.layer[2]);

    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    // this.emitter.x = this.sprite.x;
    // this.emitter.y = this.sprite.y;

    level.map.setLayer('SnowLayer');
    //  var currentTile = level.map.getTile(layer[0].getTileX(this.sprite.x), layer[0].getTileY(this.sprite.y), 'SnowLayer', true).index
    // var elapsedTime;
    //console.log(currentTile);

    // kill the snow ejection if not running over snow for 1 second.
    if (this.snowTimeStart) {
      elapsedTime = game.time.now - this.snowTimeStart;
       if (elapsedTime > 1000){
          this.emitter.on = false;
        }
    }


    // CONTROLS
    if (this.cursors.left.isDown) {
      this.facing = "LEFT";
      var dir = this.getDir(this.facing);
      this.setDir(dir);
      //this.snowAction(currentTile, layer, elapsedTime);


    } else if (this.cursors.right.isDown) {
      this.facing = "RIGHT";
       var dir = this.getDir(this.facing);
      this.setDir(dir);
      //this.snowAction(currentTile, layer, elapsedTime);

    } else if (this.cursors.up.isDown) {
      this.facing = "UP";
       var dir = this.getDir(this.facing);
      this.setDir(dir);
      //this.snowAction(currentTile, layer, elapsedTime);

    } else if (this.cursors.down.isDown) {
      this.facing = "DOWN";
       var dir = this.getDir(this.facing);
      this.setDir(dir);
      //this.snowAction(currentTile, layer, elapsedTime);


    } else {

      // Nothing

    }

    }

};
