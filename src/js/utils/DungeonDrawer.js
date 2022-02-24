import { Point } from "./types";

export default class DungeonDrawer {
  constructor(scene, dungeon, dungeonArgs, spritesheet) {
    this.scene = scene;
    this.container = this.scene.add.container();
    this.dungeon = dungeon;
    this.dungeonArgs = dungeonArgs;
    this.spritesheet = spritesheet;
  }

  draw() {
    this.dungeonDebugRenderer(this.dungeon.tree);
    this.dungeonRenderer(this.dungeon.tree);
  }

  dungeonDebugRenderer(tree) {
    if (tree.leaf) {
      let rect = this.getRectangle(
        tree.leaf.x * 16,
        tree.leaf.y * 16,
        tree.leaf.width * 16,
        tree.leaf.height * 16
      );
      rect.setStrokeStyle(2, 0x000000);
      rect.setOrigin(0, 0);
      this.container.add(rect);
      if (tree.leaf.room) {
        let rect2 = this.getRectangle(
          tree.leaf.room.x * 16,
          tree.leaf.room.y * 16,
          tree.leaf.room.width * 16,
          tree.leaf.room.height * 16
        );
        rect2.setStrokeStyle(2, 0xff0000);
        rect2.setOrigin(0, 0);
        this.container.add(rect2);
      }
      if (tree.leaf.corridor) {
        let rect3 = this.getRectangle(
          tree.leaf.corridor.x * 16,
          tree.leaf.corridor.y * 16,
          tree.leaf.corridor.width * 16,
          tree.leaf.corridor.height * 16
        );
        rect3.setStrokeStyle(2, 0x00ff00);
        rect3.setOrigin(0, 0);
        this.container.add(rect3);
      }
      if (tree.left) {
        this.dungeonDebugRenderer(tree.left);
      }
      if (tree.right) {
        this.dungeonDebugRenderer(tree.right);
      }
    }
  }

  getRectangle(x, y, width, height) {
    return new Phaser.GameObjects.Rectangle(this.scene, x, y, width, height);
  }

  dungeonRenderer(tree) {
    if (tree.leaf) {
      if (tree.leaf.room) {
        const room = tree.leaf.room;
        console.log(room);
        this.drawWalls(room);
        this.drawFloor(room);
      }

      if (tree.left) {
        this.dungeonRenderer(tree.left);
      }
      if (tree.right) {
        this.dungeonRenderer(tree.right);
      }
    }
  }

  drawFloor(room) {
      for(let y = 2; y < room.template.height - 1; y++) {
          for(let x = 1; x < room.template.width - 1; x++) {
            const p = new Point(room.x + x, room.y + y);
            let sprite = this.scene.add.sprite(p.x * 16, p.y * 16, "spritesheet_walls", 114);
            sprite.setOrigin(0);
          }
      }
  }

  drawWalls(room) {
      //left top angle
      const leftTopP = new Point(room.x, room.y);
      let sprite = this.scene.add.sprite(leftTopP.x * 16, leftTopP.y * 16, "spritesheet_walls", 0);
      sprite.setOrigin(0);
      //right top angle
      const rightTopP = new Point(room.x + room.template.width - 1, room.y);
      sprite = this.scene.add.sprite(rightTopP.x * 16, rightTopP.y * 16, "spritesheet_walls", 2);
      sprite.setOrigin(0);
      //left bottom angle
      const leftBottomP = new Point(room.x, room.y + room.template.height - 1);
      sprite = this.scene.add.sprite(leftBottomP.x * 16, leftBottomP.y * 16, "spritesheet_walls", 48);
      sprite.setOrigin(0);
      //right bottom angle
      const rightBottomP = new Point(room.x + room.template.width - 1, room.y + room.template.height - 1);
      sprite = this.scene.add.sprite(rightBottomP.x * 16, rightBottomP.y * 16, "spritesheet_walls", 50);
      sprite.setOrigin(0);
      // fill top
      for(let x = 1; x < room.template.width - 1; x++) {
        const topP = new Point(room.x + x, room.y);
        sprite = this.scene.add.sprite(topP.x * 16, topP.y * 16, "spritesheet_walls", 1);
        sprite.setOrigin(0);
        const topP2 = new Point(room.x + x, room.y + 1);
        sprite = this.scene.add.sprite(topP2.x * 16, topP2.y * 16, "spritesheet_walls", 17);
        sprite.setOrigin(0);
        const bottomP = new Point(room.x + x, room.y + room.template.height - 1);
        sprite = this.scene.add.sprite(bottomP.x * 16, bottomP.y * 16, "spritesheet_walls", 49);
        sprite.setOrigin(0);
        const bottomP2 = new Point(room.x + x, room.y + room.template.height - 2);
        sprite = this.scene.add.sprite(bottomP2.x * 16, bottomP2.y * 16, "spritesheet_walls", 33);
        sprite.setOrigin(0);
      }

      for (let y = 1; y < room.template.height - 1; y++) {
        const leftP = new Point(room.x, room.y + y);
        sprite = this.scene.add.sprite(leftP.x * 16, leftP.y * 16, "spritesheet_walls", 16);
        sprite.setOrigin(0);
        const rightP = new Point(room.x + room.template.width - 1, room.y + y);
        sprite = this.scene.add.sprite(rightP.x * 16, rightP.y * 16, "spritesheet_walls", 18);
        sprite.setOrigin(0);
      }
  }
}
