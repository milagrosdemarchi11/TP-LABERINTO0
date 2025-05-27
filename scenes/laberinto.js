// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Laberinto extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("laberinto");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
    this.load.image("JUGADOR", "./public/assets/gotita.png");
    this.load.image("FONDO", "./public/assets/assets.png");
    this.load.tilemapTiledJSON("MAPA", "./public/assets/mapa.json");
   
 
  }

  create() {
    const map = this.make.tilemap({ key: 'MAPA' });
    const tileset = map.addTilesetImage('assets', 'FONDO');
    const groundLayer = map.createLayer('FONDO', tileset);
    const wallsLayer = map.createLayer('PLATAFORMAS', tileset);
    wallsLayer.setCollisionByProperty({ colision : true });


    this.player=this.physics.add.sprite(100,100,"JUGADOR")
    this.physics.add.collider(this.player,wallsLayer)



    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.player)
   
  }



  update() {
    const speed = 200;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
    else if (this.cursors.right.isDown) this.player.setVelocityX(speed);

    if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
    else if (this.cursors.down.isDown) this.player.setVelocityY(speed);
  }
}
