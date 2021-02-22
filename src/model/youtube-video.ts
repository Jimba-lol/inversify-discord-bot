import { injectable } from 'inversify';

export interface YouTubeVideo {
    id_?: string;
    url: string;
    timestamp: number;
}

@injectable()
export class YouTubeVideo {
    constructor(
        public url: string,
        public timestamp: number,
        public id_?: string
    ) {}
}