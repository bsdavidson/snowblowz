Level = function(game){

  this.game = game;
  this.sprite = null;
  this.map = null;
  this.layer = {};

};

Level.prototype = {

    preload: function () {

      this.game.stage.backgroundColor = '#DDDDDD';
      this.game.load.image('tiles', 'assets/snow_death_tiles.png');
      this.game.load.tilemap('snowmap', 'assets/snowmap1.json', null, Phaser.Tilemap.TILED_JSON);

    },

    create: function () {
      this.map = game.add.tilemap('snowmap');
      this.map.addTilesetImage('snow_death_tiles', 'tiles');
      this.layer[0] = this.map.createLayer('Background');

      this.layer[1] = this.map.createLayer('SnowLayer');

      this.layer[2] = this.map.createLayer('BumpLayer');
      this.layer[3] = this.map.createLayer('ShadowLayer');

      this.layer[4] = this.map.createLayer('Top');
      this.game.physics.arcade.enable(this.layer[2], Phaser.Physics.ARCADE, true);
       this.layer[2].debug = true;

      this.layer[0].resizeWorld();
      this.map.setCollisionBetween(141,165,true,this.layer[2]);

    },

    update: function() {

    }

};
