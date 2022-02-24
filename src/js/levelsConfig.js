import {EmptyRoom, EnemiesRoom, RestRoom, StartRoom, FinishRoom} from './rooms';

export const levelsConfig = {
    level1: {
        rooms: [
            new EmptyRoom(),
            new EnemiesRoom(),
            new EnemiesRoom(),
            new EnemiesRoom(),
            new RestRoom(),
            new StartRoom(),
            new FinishRoom()
        ]
    }
}