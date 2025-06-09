// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/
export default class Laberinto extends Phaser.Scene {
  constructor() {
    super("laberinto");
  }

  preload() {
    this.load.image("JUGADOR", "./public/assets/gotita.png");
    this.load.image("FONDO", "./public/assets/assets.png");
    this.load.tilemapTiledJSON("MAPA", "./public/assets/mapa.json");
    this.load.image("RECOLECTABLE", "./public/assets/recolectable.png");
  }

  create() {
    const map = this.make.tilemap({ key: 'MAPA' });
    const tileset = map.addTilesetImage('assets', 'FONDO');
    
    const groundLayer = map.createLayer('FONDO', tileset);
    const wallsLayer = map.createLayer('PLATAFORMAS', tileset);
    wallsLayer.setCollisionByProperty({ colision: true });

    const objetos = map.getObjectLayer('personaje').objects;

    // Buscar objeto Salida
    const salidaObj = objetos.find(obj => obj.name === 'Salida');
    this.salida = this.physics.add.sprite(salidaObj.x, salidaObj.y, null)
      .setSize(32, 32)
      .setOrigin(0, 1)
      .setVisible(false);

    // Buscar objeto JUGADOR
    const jugadorObj = objetos.find(obj => obj.name === 'JUGADOR');
    this.player = this.physics.add.sprite(jugadorObj.x, jugadorObj.y, "JUGADOR")
      .setOrigin(0, 1);

    // Cámara
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    // Capa de recolectables
    const recolectableLayer = map.getObjectLayer('elementos');
    this.recolectables = this.physics.add.group();
    recolectableLayer.objects.forEach(obj => {
      const recolectable = this.recolectables.create(obj.x, obj.y, "RECOLECTABLE");
      recolectable.setOrigin(0, 1);
      recolectable.setScale(1.75);
      recolectable.body.setAllowGravity(false);
    });

    // Controles
    this.cursors = this.input.keyboard.createCursorKeys();

    // Texto de puntaje
    this.score = 0;
    this.recolectados = 0;
    this.scoreText = this.add.text(50, 30, 'Puntaje: 0', {
      fontSize: '18px',
      fill: '#fff',
      fontFamily: 'times new roman',
      stroke: '#000',
      strokeThickness: 4
    }).setOrigin(0, 0).setScrollFactor(0);

    // Colisiones
    this.physics.add.collider(this.player, wallsLayer);
    this.physics.add.overlap(this.player, this.recolectables, (player, recolectable) => {
      recolectable.destroy();
      this.score += 5;
      this.recolectados += 1;
      this.scoreText.setText('Puntaje: ' + this.score);
      console.log('Recolectable recogido, puntaje:', this.score, 'Recolectados:', this.recolectados);
    });

    this.physics.add.collider(this.player, this.salida, () => {
      if (this.recolectados >= 5) {
        this.scene.start('laberinto2', { puntaje: this.score });
      } else {
        this.add.text(this.player.x, this.player.y - 40, '¡Te faltan recolectables!', {
          fontSize: '16px',
          fill: '#ff0',
          stroke: '#000',
          strokeThickness: 3
        }).setOrigin(0.5).setScrollFactor(0).setDepth(100).setAlpha(0.8);
      }
    });
  }

  update() {
    const speed = 150;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
    else if (this.cursors.right.isDown) this.player.setVelocityX(speed);

    if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
    else if (this.cursors.down.isDown) this.player.setVelocityY(speed);
  }
}
