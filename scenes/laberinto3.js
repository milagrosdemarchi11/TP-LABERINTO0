export default class laberinto3 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("laberinto3");
  }
  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
    this.load.image("ENEMIGO", "./public/assets/enemigo.png");
    this.load.image("RECOLECTABLE", "./public/assets/recolectable.png");
    this.load.image("Fondo3", "./public/assets/assest nuevos 3.png");
    this.load.image("JUGADOR", "./public/assets/gotita.png");
    this.load.tilemapTiledJSON("MAPA", "./public/assets/Mapa 3.json");



  }

create() {
   const map = this.make.tilemap({ key: 'MAPA' });
   const tileset = map.addTilesetImage('asessts 3', 'Fondo3');
    const wallsLayer = map.createLayer('PARED', tileset);
    const objectLayer = map.getObjectLayer('PERSONAJE');
    const enemiesLayer = map.getObjectLayer('ENEMIGOS');
    const recolectableLayer = map.getObjectLayer('ELEMENTOS');

    const gotitaObj = objectLayer.objects.find(obj => obj.name === 'gotita');

    wallsLayer.setCollisionByProperty({ colision : true });

    // Usa sus coordenadas para posicionar al personaje
    this.player = this.physics.add.sprite(gotitaObj.x, gotitaObj.y, "JUGADOR").setScale(1.25);

    this.physics.add.collider(this.player,wallsLayer)
    this.cursors = this.input.keyboard.createCursorKeys();


    const puntoA = enemiesLayer.objects.find(obj => obj.name === 'fueguito 1 ini');
    const puntoB = enemiesLayer.objects.find(obj => obj.name === 'fueguito 1 fin');

    this.puntoA = puntoA;
    this.puntoB = puntoB;
    this.enemigo = this.physics.add.sprite(puntoA.x, puntoA.y, "ENEMIGO").setScale(1.75);
    // this.physics.add.collider(this.enemigo, wallsLayer);
    this.enemigoDireccion = 1; // 1 para ir a B, -1 para ir a A


    const puntoC = enemiesLayer.objects.find(obj => obj.name === 'fueguito 2 ini');
    const puntoD= enemiesLayer.objects.find(obj => obj.name === 'fueguito 2 fin');

    this.puntoC = puntoC;
    this.puntoD = puntoD;
    this.enemigo1 = this.physics.add.sprite(puntoC.x, puntoC.y, "ENEMIGO").setScale(1.75);
    this.physics.add.collider(this.enemigo1, wallsLayer);
    this.enemigo1Direccion = 1; // 1 para ir a B, -1 para ir a A



    const puntoE = enemiesLayer.objects.find(obj => obj.name === 'fueguito 3 ini');
    const puntoF= enemiesLayer.objects.find(obj => obj.name === 'fueguito 3 fin');

    this.puntoE = puntoE;
    this.puntoF = puntoF;
    this.enemigo2 = this.physics.add.sprite(puntoE.x, puntoE.y, "ENEMIGO").setScale(1.75);
    this.physics.add.collider(this.enemigo2, wallsLayer);
    this.enemigo2Direccion = 1; // 1 para ir a B, -1 para ir a A



    const puntoG = enemiesLayer.objects.find(obj => obj.name === 'fueguito 4 ini');
    const puntoH= enemiesLayer.objects.find(obj => obj.name === 'fueguito 4 fin');

    this.puntoG = puntoG;
    this.puntoH = puntoH;
    this.enemigo3 = this.physics.add.sprite(puntoG.x, puntoG.y, "ENEMIGO").setScale(1.75);
    this.physics.add.collider(this.enemigo3, wallsLayer);
    this.enemigo3Direccion = 1; // 1 para ir a B, -1 para ir a A


    // ...resto del código...
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setZoom(1.75); // Ajusta el zoom de la cámara


    // Crear un grupo para los recolectables
    this.recolectables = this.physics.add.group();
    
    // Crear un recolectable por cada objeto en la capa "elementos"
    recolectableLayer.objects.forEach(obj => {
        const recolectable = this.recolectables.create(obj.x, obj.y, "RECOLECTABLE");
        recolectable.setOrigin(0, 1);
        recolectable.setScale(1.75); // Ajusta el tamaño del recolectable
        recolectable.body.setAllowGravity(false);
    });

  

    
    this.score = 0;
this.scoreText = this.add.text(
    400, 200, 'Puntaje: 0', // <-- Esquina superior izquierda
    {
        fontSize: '18px',
        fill: '#fff',
        fontFamily: 'times new roman',
        stroke: '#000',
        strokeThickness: 4
    }
).setOrigin(0, 0);
this.scoreText.setScrollFactor(0);

// TEST: Texto de prueba
//this.add.text(200, 200, 'PRUEBA', { fontSize: '48px', fill: '#f00' })

// Colisión entre jugador y recolectables
this.physics.add.overlap(this.player, this.recolectables, (player, recolectable) => {
    recolectable.destroy();
    this.score += 5;
    this.scoreText.setText('Puntaje: ' + this.score);
    console.log('Recolectable recogido, puntaje:', this.score);
});

// Busca el objeto salida en la capa de objetos correspondiente
const salidaObj = objectLayer.objects.find(obj => obj.name === 'Salida');

// Crea un sprite invisible en esa posición
this.salida = this.physics.add.sprite(salidaObj.x, salidaObj.y, null)
    .setSize(32, 32) // Ajusta el tamaño según tu tile/objeto
    .setOrigin(-10.5, -0.5)

// Colisión entre el jugador y la salida
this.physics.add.collider(this.player, this.salida, () => {
    this.scene.start('fin', { puntaje: this.score }); // Cambia a la escena "fin"
});

}

  update() {
    const speed = 150;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
    else if (this.cursors.right.isDown) this.player.setVelocityX(speed);

    if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
    else if (this.cursors.down.isDown) this.player.setVelocityY(speed);

    const speedEnemigo = 200;
    if (this.enemigoDireccion === 1 ) {
        this.physics.moveToObject(this.enemigo, this.puntoB, speedEnemigo);
        if (Phaser.Math.Distance.Between(this.enemigo.x, this.enemigo.y, this.puntoB.x, this.puntoB.y) < 4) {
            this.enemigoDireccion = -1;
            } 
            this.physics.moveToObject(this.enemigo1, this.puntoD, speedEnemigo);
        if (Phaser.Math.Distance.Between(this.enemigo1.x, this.enemigo1.y, this.puntoD.x, this.puntoD.y) < 4) {
            this.enemigoDireccion = -1;
        }
          this.physics.moveToObject(this.enemigo2, this.puntoF, speedEnemigo);
        if (Phaser.Math.Distance.Between(this.enemigo2.x, this.enemigo2.y, this.puntoF.x, this.puntoF.y) < 4) {
            this.enemigo2Direccion = -1;
        }
          this.physics.moveToObject(this.enemigo3, this.puntoH, speedEnemigo);
        if (Phaser.Math.Distance.Between(this.enemigo3.x, this.enemigo3.y, this.puntoH.x, this.puntoH.y) < 4) {
            this.enemigo3Direccion = -1;
        }
    } else {
        this.physics.moveToObject(this.enemigo, this.puntoA, speedEnemigo);
        if (Phaser.Math.Distance.Between(this.enemigo.x, this.enemigo.y, this.puntoA.x, this.puntoA.y) < 4) {
            this.enemigoDireccion = 1;
            }
              this.physics.moveToObject(this.enemigo1, this.puntoC, speedEnemigo);
        if (Phaser.Math.Distance.Between(this.enemigo1.x, this.enemigo1.y, this.puntoC.x, this.puntoC.y) < 4) {
           this.enemigo1Direccion = 1;
        }
            this.physics.moveToObject(this.enemigo2, this.puntoE, speedEnemigo);
        if (Phaser.Math.Distance.Between(this.enemigo2.x, this.enemigo2.y, this.puntoE.x, this.puntoE.y) < 4) {
           this.enemigo2Direccion = 1;
        }
          this.physics.moveToObject(this.enemigo3, this.puntoG, speedEnemigo);
        if (Phaser.Math.Distance.Between(this.enemigo3.x, this.enemigo3.y, this.puntoG.x, this.puntoG.y) < 4) {
           this.enemigo3Direccion = 1;
        }
    }
  }
}



