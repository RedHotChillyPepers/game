import Phaser from "phaser";
import { DungeonGenerator } from "../utils/DungionGenerator";

export default class GameScreen extends Phaser.Scene {
  constructor() {
    super("GameScreen");
  }

  preload() {
    // At last image must be loaded with its JSON
    // this.load.atlas(
    //   "player",
    //   "assets/images/kenney_player.png",
    //   "assets/images/kenney_player_atlas.json"
    // );
    this.load.spritesheet("spritesheet", "assets/images/spritesheet.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    // Load the export Tiled JSON
    // this.load.tilemapTiledJSON("level1", "assets/images/level1.json");
  }

  create() {
    // this.player = this.physics.add.staticGroup();
    // const map = this.make.tilemap({ key: 'level1' });
    // const tileset = map.addTilesetImage('spritesheet', 'spritesheet');
    // const background = map.createLayer('background', tileset, 0, 0);
    // background.setScale(1,1);
    // const playerLayer = map.createFromObjects('Objects', {key: 'spritesheet'});
    // const player = this.add.sprite(64,64,"spritesheet", 181);
    // player.setScale(2,2);
    // player.setFlipX(true);
    // new DungeonGenerator().generate(0);
    // player.scale(10,10);

    // playerLayer.forEach(object => {
    //     console.log(object);
    //     let obj = this.player.create(object.x, object.y, "player");
    //    obj.setScale(1, 1);
    //    obj.setOrigin(0);
    //    obj.body.width = object.width;
    //    obj.body.height = object.height;
    // });

    const dungeonGenerator = new DungeonGenerator();
    let dungeon = dungeonGenerator.generate(0);
    console.log(dungeon);
    this.dungeonDebugRenderer(dungeon.tree);
  }

  dungeonDebugRenderer(tree) {
    if (tree.leaf) {
      const color = new Phaser.Display.Color();
      color.random(50);
      let rect = this.add.rectangle(
        tree.leaf.x * 16,
        tree.leaf.y * 16,
        tree.leaf.width * 16,
        tree.leaf.height * 16
      );
      rect.setStrokeStyle(2, 0x000000);
      rect.setOrigin(0, 0);
      if (tree.leaf.room) {
        let rect2 = this.add.rectangle(
          tree.leaf.room.x * 16,
          tree.leaf.room.y * 16,
          tree.leaf.room.width * 16,
          tree.leaf.room.height * 16
        );
        rect2.setStrokeStyle(2, 0xff0000);
        rect2.setOrigin(0, 0);
      }
      if (tree.leaf.corridor) {
        let rect3 = this.add.rectangle(
          tree.leaf.corridor.x * 16,
          tree.leaf.corridor.y * 16,
          tree.leaf.corridor.width * 16,
          tree.leaf.corridor.height * 16
        );
        rect3.setStrokeStyle(2, 0x00ff00);
        rect3.setOrigin(0, 0);
      }
      if (tree.left) {
        this.dungeonDebugRenderer(tree.left);
      }
      if (tree.right) {
        this.dungeonDebugRenderer(tree.right);
      }
    }
  }
}
