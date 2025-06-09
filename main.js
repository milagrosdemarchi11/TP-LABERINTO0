
import laberinto2 from "./scenes/laberinto2.js";
import laberinto3 from "./scenes/laberinto3.js";
import fin from "./scenes/fin.js";


const config = {
  type: Phaser.AUTO,
  width: 1820,
  height: 880,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      //debug: true
    }
  },
  scene: [ laberinto2, laberinto3, fin]
};

const game = new Phaser.Game(config);
