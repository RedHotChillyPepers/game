import { random, randomChoice } from "./utils";
import { TreeNode, Container, Room, Corridor, RoomTemplate } from "./types";
import seedrandom from "seedrandom";

export class DungeonGenerator {
  constructor() {}

  generate(level) {
    let config = {
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

    const args = config.levels[level];

    // If a seed is provided, use it to generate dungeon.
  if (args.seed) {
    seedrandom(args.seed, { global: true });
  }

  const startAt = Date.now();

  const tree = this.createTree(args);
  // const tiles = createTilesLayer(tree, args);
  // const props = createPropsLayer(tree, tiles, args);
  // const monsters = createMonstersLayer(tree, args);

  const endAt = Date.now();
  console.log(`Dungeon generated in ${endAt - startAt}ms`);

  return {
    width: args.mapWidth,
    height: args.mapHeight,
    tree,
    // layers: {
    //   tiles,
    //   props,
    //   monsters,
    // },
  };
  }

  createTree(args) {
    const tree = this.generateTree(
      new Container(
        args.mapGutterWidth,
        args.mapGutterWidth,
        args.mapWidth - args.mapGutterWidth * 2,
        args.mapHeight - args.mapGutterWidth * 2
      ),
      args.iterations,
      args
    );
  
    this.generateRooms(tree, args);
  
    return tree;
  }

  generateTree(
    container,
    iterations,
    args
  ) {
    const node = new TreeNode(container);
  
    if (
      iterations !== 0 &&
      node.leaf.width > args.containerMinimumSize * 2 &&
      node.leaf.height > args.containerMinimumSize * 2
    ) {
      // We still need to divide the container
      const [left, right] = this.splitContainer(
        container,
        args,
        args.containerSplitRetries
      );
      if (left && right) {
        node.left = this.generateTree(left, iterations - 1, args);
        node.right = this.generateTree(right, iterations - 1, args);
  
        // Once divided, we create a corridor between the two containers
        node.leaf.corridor = this.generateCorridor(
          node.left.leaf,
          node.right.leaf,
          args
        );
      }
    }
  
    return node;
  }

  splitContainer(
    container,
    args,
    iterations
  ) {
    let left, right;
  
    // We tried too many times to split the container without success
    if (iterations === 0) {
      return [null, null];
    }
  
    // Generate a random direction to split the container
    const direction = randomChoice(["vertical", "horizontal"]);
    if (direction === "vertical") {
      // Vertical
      left = new Container(
        container.x,
        container.y,
        random(1, container.width),
        container.height
      );
      right = new Container(
        container.x + left.width,
        container.y,
        container.width - left.width,
        container.height
      );
  
      // Retry splitting the container if it's not large enough
      const leftWidthRatio = left.width / left.height;
      const rightWidthRatio = right.width / right.height;
      if (
        leftWidthRatio < args.containerMinimumRatio ||
        rightWidthRatio < args.containerMinimumRatio
      ) {
        return this.splitContainer(container, args, iterations - 1);
      }
    } else {
      // Horizontal
      left = new Container(
        container.x,
        container.y,
        container.width,
        random(1, container.height)
      );
      right = new Container(
        container.x,
        container.y + left.height,
        container.width,
        container.height - left.height
      );
  
      // Retry splitting the container if it's not high enough
      const leftHeightRatio = left.height / left.width;
      const rightHeightRatio = right.height / right.width;
      if (
        leftHeightRatio < args.containerMinimumRatio ||
        rightHeightRatio < args.containerMinimumRatio
      ) {
        return this.splitContainer(container, args, iterations - 1);
      }
    }
  
    return [left, right];
  }

  generateCorridor(
    left,
    right,
    args
  ) {
    // Create the corridor
    const leftCenter = left.center;
    const rightCenter = right.center;
    const x = Math.ceil(leftCenter.x);
    const y = Math.ceil(leftCenter.y);
  
    let corridor;
    if (leftCenter.x === rightCenter.x) {
      // Vertical
      corridor = new Corridor(
        x - Math.ceil(args.corridorWidth / 2),
        y - Math.ceil(args.corridorWidth / 2),
        Math.ceil(args.corridorWidth),
        Math.ceil(rightCenter.y) - y
      );
    } else {
      // Horizontal
      corridor = new Corridor(
        x - Math.ceil(args.corridorWidth / 2),
        y - Math.ceil(args.corridorWidth / 2),
        Math.ceil(rightCenter.x) - x,
        Math.ceil(args.corridorWidth)
      );
    }
  
    return corridor;
  }
  
  generateRooms(tree, args) {
    this.fillByType(tree, args, "boss", -1);
    // fillByType(tree, args, "entrance", 1);
    // fillByType(tree, args, "heal", 1);
    // fillByType(tree, args, "treasure", 1);
    // fillByType(tree, args, "monsters", -1);
  }

  fillByType(
    tree,
    args,
    type,
    count
  ) {
    // Filter available templates by type
    const templates = this.getTemplatesByType(args.rooms, type);
    console.log(templates);
    if (templates.length === 0) {
      throw new Error(`Couldn't find templates of type "${type}"`);
    }
  
    // List containers ids that have no rooms yet
    const containers = this.getEmptyContainers(tree.leaves);
    if (containers.length === 0) {
      throw new Error(
        `Couldn't find containers to fit ${count} templates of type "${type}"`
      );
    }
  
    // "-1" means "fill rest"
    if (count === -1) {
      count = containers.length;
    }
  
    // NEW
    const usedContainersIds = [];
    const usedTemplatesIds = [];
    while (count > 0) {
      const container = this.getRandomContainer(containers, usedContainersIds);
      if (!container) {
        break;
      }
  
      const template = this.findFittingTemplate(
        //templates
        templates,
        container,
        usedTemplatesIds
      );
  
      if (template) {
        const x = Math.floor(container.center.x - template.width / 2);
        const y = Math.floor(container.center.y - template.height / 2);
        container.room = new Room(x, y, template.id, template);
        usedTemplatesIds.push(template.id);
      } else {
        console.warn(
          `Couldn't find a template fitting width="${container.width}" height="${container.height}" for type="${type}"`
        );
      }
  
      usedContainersIds.push(container.id);
      count--;
    }
  }

  getEmptyContainers(containers) {
    return containers.filter((leaf) => !leaf.room);
  }

  getRandomContainer(
    containers,
    usedIds
  ) {
    const filtered = containers.filter(
      (container) => !usedIds.includes(container.id)
    );
    if (!filtered.length) {
      return null;
    }
  
    return randomChoice(filtered);
  }

  findFittingTemplate(
    templates,
    container,
    usedIds
  ) {
    const sorted = this.sortTemplatesBySize(templates).reverse();
  
    let result = sorted.find(
      (template) =>
        !usedIds.includes(template.id) &&
        template.width <= container.width &&
        template.height <= container.height
    );
  
    if (!result) {
      result = sorted.find(
        (template) =>
          template.width <= container.width && template.height <= container.height
      );
    }
  
    return result;
  }

  sortTemplatesBySize(templates) {
    return templates.sort((a, b) => a.width - b.width || a.height - b.height);
  }
  
  getTemplatesByType(
    templates,
    type
  ) {
    return templates.filter((room) => {
      console.log(templates, type, room.type, room.type === type);
      return room.type === type;
    });
  }

  createTilesLayer(
    tree,
    args
  ) {
    let tiles = createTilemap(args.mapWidth, args.mapHeight, 1);
  
    tiles = carveCorridors(tree, duplicateTilemap(tiles));
    tiles = carveRooms(tree, duplicateTilemap(tiles));
    tiles = computeTilesMask(duplicateTilemap(tiles));
  
    return tiles;
  }

  carveCorridors(node, tiles) {
    const corridor = node.leaf.corridor;
    if (!corridor) {
      return tiles;
    }
  
    for (let y = 0; y < tiles.length; y++) {
      for (let x = 0; x < tiles[y].length; x++) {
        const inHeightRange = y >= corridor.y && y < corridor.down;
        const inWidthRange = x >= corridor.x && x < corridor.right;
        if (inHeightRange && inWidthRange) {
          tiles[y][x] = 0;
        }
      }
    }
  
    if (node.left) {
      carveCorridors(node.left, tiles);
    }
  
    if (node.right) {
      carveCorridors(node.right, tiles);
    }
  
    return tiles;
  }
  
  carveRooms(node, tiles) {
    let result = duplicateTilemap(tiles);
  
    node.leaves.forEach((container) => {
      const room = container.room;
      if (!room) {
        return;
      }
  
      const tilesLayer = room.template.layers.tiles;
      for (let y = 0; y < room.template.height; y++) {
        for (let x = 0; x < room.template.width; x++) {
          const posY = room.y + y;
          const posX = room.x + x;
          result[posY][posX] = tilesLayer[y][x];
        }
      }
    });
  
    return result;
  }
  

}

export class DungeonArgs {
    constructor(mapWidth, mapHeight, mapGutterWidth, iterations, containerSplitRetries, containerMinimumRatio, containerMinimumSize, corridorWidth, seed = null) {
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.mapGutterWidth = mapGutterWidth;
        this.iterations = iterations;
        this.containerSplitRetries = containerSplitRetries;
        this.containerMinimumRatio = containerMinimumRatio;
        this.containerMinimumSize = containerMinimumSize;
        this.corridorWidth = corridorWidth;
        this.seed = seed;
        this.rooms = [
          new RoomTemplate(
            'boss',
            5,
            5
          )
        ];
    }
  /** A list of rooms to be used in the dungeon */
  rooms = [];
  /** Width of the map */
  mapWidth = 0;
  /** Height of the map */
  mapHeight = 0;
  /** Gutter of the top-most container (used for sub-containers) */
  mapGutterWidth = 0;
  /** Number of recursive divisions */
  iterations = 0;
  /** Maximum attempts to split a container in half */
  containerSplitRetries = 0;
  /** Minimum size ratio of a split a container in its parent */
  containerMinimumRatio = 0;
  /** Minimum size for a container under which he cannot be split */
  containerMinimumSize = 0;
  /** Width of corridors */
  corridorWidth = 0;
  /** The seed used to generate the dungeon */
  seed = null;
}

export class Dungeon {
  width = 0;
  height = 0;
  tree = null;
  layers = {
    tiles: null,
    props: null,
    monsters: null
  };
}

