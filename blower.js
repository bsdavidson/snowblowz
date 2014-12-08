Blower = function(game, player){

  this.game = game;
  this.startX = 300;
  this.startY = 300;
  this.sprite = null;
  this.facing = null;
  this.snowTile = 13;
  this.speed = 150;
  this.moving = false;
  this.direction = {};
  this.chuteDir = 'left'; //left, forward, right

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
    game.physics.arcade.collide(player, tile_layer, removeTile);
};

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

Blower.prototype = {

    getDir: function(DIRECTION) {
      return {x: DIRXY[DIR[DIRECTION]].x, y: DIRXY[DIR[DIRECTION]].y};
    },

    setDir: function(dir) {
      this.sprite.body.velocity.x = this.speed * dir.x;
      this.sprite.body.velocity.y = this.speed * dir.y;
      this.emitter.minParticleSpeed.setTo(40, 300);  // X, Y
      this.emitter.maxParticleSpeed.setTo(80, 400);
    },

    snowAction: function(currentTile, layer, elapsedTime) {
      if (currentTile != this.snowTile) {
        this.snowTimeStart = game.time.now;
        this.emitter.start(false, 1000, null, 100);
        level.map.fill(this.snowTile, layer[0].getTileX(this.sprite.x), layer[0].getTileY(this.sprite.y), 2, 2);
        level.map.fill(148, layer[0].getTileX(this.sprite.x + randomInt.x), layer[0].getTileY(this.sprite.y - randomInt.y), 1, 1);

      } else {
        if (elapsedTime > 500){
          this.emitter.on = false;
        }
      }

    },

    preload: function () {
     // this.game.load.spritesheet('snowblower', 'assets/baddie.png', 16, 128);
      this.game.load.image('snowblower', 'assets/star.png');
      this.game.load.image('snowflake', 'assets/snow_flake.png');
    },

    create: function () {
      this.sprite = new Phaser.Sprite(this.game,this.startX,this.startY,"snowblower");

      this.game.physics.arcade.enable(this.sprite);
      this.sprite.body.collideWorldBounds = true;
      this.game.world.addAt(this.sprite, 2);
      // this.sprite.animations.add('left', [1], 10, true);
      // this.sprite.animations.add('right', [0], 10, true);


      this.emitter = this.game.add.emitter(this.sprite.x, this.sprite.y, 100);
      this.emitter.makeParticles('snowflake');
    },

    update: function(level, map) {
    var layer = level.layer;
      //console.log('Level', level.layer[3].layer);
    this.game.physics.arcade.collide(this.sprite, level.layer[2]);
    this.game.physics.arcade.collide(player.sprite, this.sprite);

    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    // game.add.sprite(this.sprite.x, this.sprite.y, 'right');
    this.emitter.x = this.sprite.x;
    this.emitter.y = this.sprite.y;

    level.map.setLayer('SnowLayer');
    var currentTile = level.map.getTile(layer[0].getTileX(this.sprite.x), layer[0].getTileY(this.sprite.y), 'SnowLayer', true).index
    var elapsedTime;

   //this.sprite.frame = 1;

    console.log(currentTile);

    // kill the snow ejection if not running over snow for 1 second.
    if (this.snowTimeStart) {
      elapsedTime = game.time.now - this.snowTimeStart;
       if (elapsedTime > 1000){
          this.emitter.on = false;
        }
    }

    this.snowAction(currentTile, layer, elapsedTime);
    // CONTROLS
    // if (this.cursors.left.isDown) {
    //   this.facing = "LEFT";
    //   var dir = this.getDir(this.facing);
    //   this.setDir(dir);
    //


    // } else if (this.cursors.right.isDown) {
    //   this.facing = "RIGHT";
    //    var dir = this.getDir(this.facing);
    //   this.setDir(dir);
    //   this.snowAction(currentTile, layer, elapsedTime);

    // } else if (this.cursors.up.isDown) {
    //   this.facing = "UP";
    //    var dir = this.getDir(this.facing);
    //   this.setDir(dir);
    //   this.snowAction(currentTile, layer, elapsedTime);

    // } else if (this.cursors.down.isDown) {
    //   this.facing = "DOWN";
    //    var dir = this.getDir(this.facing);
    //   this.setDir(dir);
    //   this.snowAction(currentTile, layer, elapsedTime);


    // } else {

    //   // Nothing

    // }

    }

};
