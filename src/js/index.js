import Phaser from 'phaser';
import GameScreen2 from './scenes/GameScreen2';

window.onload = function() {
    const gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: 0x4488aa,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1920,
            height: 1024
        },
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 0 }
            }
        },
        scene: GameScreen2
    }

    const game = new Phaser.Game(gameConfig);
}