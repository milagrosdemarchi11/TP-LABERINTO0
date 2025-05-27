import Laberinto from "./scenes/laberinto.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
  },
  scene: [Laberinto]
   
  
};

const game = new Phaser.Game(config);
