import { gameConfig } from "../gameConfig";
import { random } from "../utils/utils";

export default class GameScreen2 extends Phaser.Scene {
  constructor() {
    super("GameScreen");
  }

  preload() {
    this.load.spritesheet("spritesheet", "assets/images/spritesheet.png", {
      frameWidth: gameConfig.tileSize,
      frameHeight: gameConfig.tileSize,
    });

    this.load.spritesheet(
      "spritesheet_walls",
      "assets/images/spritesheet_walls.png",
      {
        frameWidth: gameConfig.tileSize,
        frameHeight: gameConfig.tileSize,
      }
    );
  }

  create() {
    const scale = 2;
    const mapWidth = Math.floor(window.innerWidth / (16 * scale));
    const mapHeight = Math.floor(window.innerHeight / (16 * scale));

    this.drawFloor(mapWidth, mapHeight, scale);
    this.drawWalls(mapWidth, mapHeight, scale);
    this.drawDoors(mapWidth, mapHeight, scale);
  }

  drawFloor(width, height, scale) {
    for (let y = 2; y < height; y++) {
      for (let x = 1; x < width - 1; x++) {
        let sprite = this.add.sprite(
          x * 16 * scale,
          y * 16 * scale,
          "spritesheet_walls",
          114
        );
        sprite.setOrigin(0);
        sprite.setScale(scale, scale);
      }
    }
  }

  drawWalls(width, height, scale) {
    //left top angle
    let sprite = this.add.sprite(0, 0, "spritesheet_walls", 0);
    sprite.setOrigin(0);
    sprite.setScale(scale, scale);
    //right top angle
    sprite = this.add.sprite(
      (width - 1) * 16 * scale,
      0,
      "spritesheet_walls",
      2
    );
    sprite.setOrigin(0);
    sprite.setScale(scale, scale);
    //left bottom angle
    sprite = this.add.sprite(0, height * 16 * scale, "spritesheet_walls", 48);
    sprite.setOrigin(0);
    sprite.setScale(scale, scale);
    //right bottom angle
    sprite = this.add.sprite(
      (width - 1) * 16 * scale,
      height * 16 * scale,
      "spritesheet_walls",
      50
    );
    sprite.setOrigin(0);
    sprite.setScale(scale, scale);
    //fill top
    for (let x = 1; x < width - 1; x++) {
      sprite = this.add.sprite(x * 16 * scale, 0, "spritesheet_walls", 1);
      sprite.setOrigin(0);
      sprite.setScale(scale, scale);
      sprite = this.add.sprite(
        x * 16 * scale,
        16 * scale,
        "spritesheet_walls",
        17
      );
      sprite.setOrigin(0);
      sprite.setScale(scale, scale);
      sprite = this.add.sprite(
        x * 16 * scale,
        height * 16 * scale,
        "spritesheet_walls",
        49
      );
      sprite.setOrigin(0);
      sprite.setScale(scale, scale);
      sprite = this.add.sprite(
        x * 16 * scale,
        (height - 1) * 16 * scale,
        "spritesheet_walls",
        1
      );
      sprite.setOrigin(0);
      sprite.setScale(scale, scale);
    }

    for (let y = 1; y < height; y++) {
      sprite = this.add.sprite(0, y * 16 * scale, "spritesheet_walls", 16);
      sprite.setOrigin(0);
      sprite.setScale(scale, scale);
      sprite = this.add.sprite(
        (width - 1) * 16 * scale,
        y * 16 * scale,
        "spritesheet_walls",
        18
      );
      sprite.setOrigin(0);
      sprite.setScale(scale, scale);
    }
  }

  drawDoors(width, height, scale) {
    const constraintX = 8;
    const posX = random(constraintX, width - constraintX);

    for (let i = 0; i < 4; i++) {
        let sprite = this.add.sprite((posX + i) * 16 * scale, 0, "spritesheet_walls", (22 + i));
        sprite.setOrigin(0);
        sprite.setScale(scale, scale);
        sprite = this.add.sprite((posX + i) * 16 * scale, 16 * scale, "spritesheet_walls", (38 + i));
        sprite.setOrigin(0);
        sprite.setScale(scale, scale);
    }

    
    // sprite = this.add.sprite((posX + 1) * 16 * scale, 0, "spritesheet_walls", 23);
    // sprite.setOrigin(0);
    // sprite.setScale(scale, scale);
    // sprite = this.add.sprite((posX + 1) * 16 * scale, 0, "spritesheet_walls", 23);
    // sprite.setOrigin(0);
    // sprite.setScale(scale, scale);
    // sprite = this.add.sprite((posX + 1) * 16 * scale, 0, "spritesheet_walls", 23);
    // sprite.setOrigin(0);
    // sprite.setScale(scale, scale);
    
  }
}
