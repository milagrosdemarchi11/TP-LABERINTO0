export default class laberinto2 extends Phaser.Scene {
  constructor() {
    super("laberinto2");
  }

  preload() {
    this.load.image("ENEMIGO", "./public/assets/enemigo.png");
    this.load.image("RECOLECTABLE", "./public/assets/recolectable.png");
    this.load.image("Fondo2", "./public/assets/assets_nuevos.png");
    this.load.image("JUGADOR", "./public/assets/gotita.png");
    this.load.tilemapTiledJSON("MAPA", "./public/assets/Mapa_2.json");
  }

  create() {
    const map = this.make.tilemap({ key: 'MAPA' });
    const tileset = map.addTilesetImage('assets nuevos', 'Fondo2');
    const groundLayer = map.createLayer('PLATAFORMAS', tileset);
  
    groundLayer.setCollisionByProperty({ colision: true });

    const objectLayer = map.getObjectLayer('personaje');
    const enemiesLayer = map.getObjectLayer('enemis');
    const recolectableLayer = map.getObjectLayer('elementos');

   //personaje
    const gotitaObj = objectLayer.objects.find(obj => obj.name === 'JUGADOR');
    this.JUGADOR = this.physics.add.sprite(gotitaObj.x, gotitaObj.y, "JUGADOR").setScale(1.25);
    this.JUGADOR.setCollideWorldBounds(true);
    this.physics.add.collider(this.JUGADOR, groundLayer);

    this.enemigos = [];
    const enemigosData = [
      { ini: 'fueguito 1 ini', fin: 'fueguito 1 fin' },
      { ini: 'fueguito 2 ini', fin: 'fueguito 2 fin' },
      { ini: 'fueguito 3 ini', fin: 'fueguito 3 fin' },
      { ini: 'fueguito 4 ini', fin: 'fueguito 4 fin' }
    ];

    enemigosData.forEach((data) => {
      const puntoIni = enemiesLayer.objects.find(obj => obj.name === data.ini);
      const puntoFin = enemiesLayer.objects.find(obj => obj.name === data.fin);

      const enemigo = this.physics.add.sprite(puntoIni.x, puntoIni.y, "ENEMIGO").setScale(1.75);
      this.physics.add.collider(enemigo, groundLayer);

      this.enemigos.push({ sprite: enemigo, A: puntoIni, B: puntoFin, direccion: 1 });
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setZoom(1.75);

    this.recolectables = this.physics.add.group();
    recolectableLayer.objects.forEach(obj => {
      const recolectable = this.recolectables.create(obj.x, obj.y, "RECOLECTABLE");
      recolectable.setOrigin(0, 1).setScale(1.75);
      recolectable.body.setAllowGravity(false);
    });

    this.score = 0;
    this.scoreText = this.add.text(400, 200, 'Puntaje: 0', {
      fontSize: '18px',
      fill: '#f00',
      fontFamily: 'times new roman',
      stroke: '#000',
      strokeThickness: 4
    }).setOrigin(0.5).setScrollFactor(0);

    this.physics.add.overlap(this.player, this.recolectables, (player, recolectable) => {
      recolectable.destroy();
      this.score += 5;
      this.scoreText.setText('Puntaje: ' + this.score);
    });

    const salidaObj = objectLayer.objects.find(obj => obj.name === 'Salida');
    this.salida = this.physics.add.sprite(salidaObj.x, salidaObj.y, null)
      .setSize(32, 32)
      .setOrigin(0, 1)
      .setVisible(false);

    this.physics.add.overlap(this.player, this.salida, () => {
      this.scene.start('laberinto3', { puntaje: this.score });
    });
  }

  update() {
    const speed = 300;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
    else if (this.cursors.right.isDown) this.player.setVelocityX(speed);

    if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
    else if (this.cursors.down.isDown) this.player.setVelocityY(speed);

    const speedEnemigo = 200;
    this.enemigos.forEach(enemigoData => {
      const { sprite, A, B } = enemigoData;
      if (enemigoData.direccion === 1) {
        this.physics.moveToObject(sprite, B, speedEnemigo);
        if (Phaser.Math.Distance.Between(sprite.x, sprite.y, B.x, B.y) < 4) {
          enemigoData.direccion = -1;
        }
      } else {
        this.physics.moveToObject(sprite, A, speedEnemigo);
        if (Phaser.Math.Distance.Between(sprite.x, sprite.y, A.x, A.y) < 4) {
          enemigoData.direccion = 1;
        }
      }
    });
  }
}
