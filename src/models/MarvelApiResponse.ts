import { Hero } from "./MarvelHero";

export class MarvelApiResponse {
    attributionHTML: string;
    attributionText: string;
    code: string;
    copyright: string;
    etag: string;
    status: string;
    data: {
        count: number;
        limit: number;
        offset: number;
        total: number;
        results: Hero[];
    }
}