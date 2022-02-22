import Phaser from "phaser";
import { DungeonGenerator, DungeonArgs } from "../utils/DungionGenerator";
import DungeonDrawer from "../utils/DungeonDrawer";

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

        const config = {
            levels: [
                new DungeonArgs(
                    64,
                    48,
                    1,
                    4,
                    30,
                    0.45,
                    4,
                    2
                ),
            ],
        };

        const spritesheet = this.textures.get("spritesheet");

        const dungeonArgs = config.levels[0];
        const dungeonGenerator = new DungeonGenerator();
        let dungeon = dungeonGenerator.generate(dungeonArgs);
        console.log(dungeon);
        const dungeonDrawer = new DungeonDrawer(this, dungeon, dungeonArgs, spritesheet);
        dungeonDrawer.draw();
    }
}