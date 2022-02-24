import { Rectangle } from "./utils/types";
import { random } from "./utils/utils";

class Room extends Rectangle {
    constructor(width, height, type, sortIndex) {
        super(0,0,width,height);
        this.type = type;
        this.sortIndex = sortIndex;
    }
}

export class EmptyRoom extends Room {
    constructor() {
        super(random(10, 15), random(10, 15), "empty", 2);
    }
}

export class EnemiesRoom extends Room {
    constructor() {
        super(random(20, 30), random(20, 30), "enemies", 2);
    }
}

export class RestRoom extends Room {
    constructor() {
        super(random(10, 15), random(10, 15), "rest", 2);
    }
}

export class StartRoom extends Room {
    constructor() {
        super(random(10, 15), random(10, 15), "start", 0);
    }
}

export class FinishRoom extends Room {
    constructor() {
        super(random(10, 15), random(10, 15), "finish", 128);
    }
}

export class BossRoom extends Room {
    constructor() {
        super(random(20, 30), random(20, 30), "boss", 2);
    }
}