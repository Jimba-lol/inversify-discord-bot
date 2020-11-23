import { injectable } from 'inversify';

interface RobloxGameInterface {
    _id?: string;
    gameID: number;
    gameName: string;
    gameDesc: string;
    gameGenre: string;
    requestorID: string;
    timestamp: number;
}

@injectable()
export class RobloxGame implements RobloxGameInterface {
    constructor(
        public gameID: number,
        public gameName: string,
        public gameDesc: string,
        public gameGenre: string,
        public requestorID: string,
        public timestamp: number,
        public id?: string
    ) {}
}