export class Hero {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    resourceURI: string;
    comics: DefaultResponse;
    series: DefaultResponse;
    stories: DefaultResponse;
    events: DefaultResponse;
    urls: [{
        type: string;
        url: string;
    }]
}

class DefaultResponse {
    available: number;
    collectionURI: string;
    items: [{
        resourceURI: string;
        name: string;
        type?: string;
    }];
    returned: number;
}