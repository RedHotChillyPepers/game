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
}