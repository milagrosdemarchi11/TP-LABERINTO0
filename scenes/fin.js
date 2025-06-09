export default class fin extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("fin");
  }
  init(data) {
  this.score = data.puntaje; // Ahora tienes el puntaje en la nueva escena
}
}
