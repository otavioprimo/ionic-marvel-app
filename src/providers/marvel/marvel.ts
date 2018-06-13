import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MarvelApiResponse } from "../../models/MarvelApiResponse";
import * as md5 from "md5";


@Injectable()
export class MarvelProvider {

  private apiKey: string;
  private privateApiKey: string;
  private baseUri: string;

  constructor(private http: HttpClient) {
    this.apiKey = "5ad3e67383a0bc0292b513680c172d71";
    this.privateApiKey = "c996dcae1cdca58c2f91d0073a9683321bff2856";
    this.baseUri = `https://gateway.marvel.com:443/v1/public/`;
  }

  getHeroesByName(name: string, page: number = 1, limit: number = 5): Promise<MarvelApiResponse> {

    let timestamp = this.randomTimestamp();

    let hash = md5(timestamp + this.privateApiKey + this.apiKey);

    let offset = limit * (page - 1);
    let params = `?ts=${timestamp}&apikey=${this.apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

    name ? params += `&nameStartsWith=${name}` : "";

    console.log(`${this.baseUri}characters${params}`);
    return new Promise((resolve, reject) => {
      this.http.get(`${this.baseUri}characters${params}`).toPromise()
        .then((data: MarvelApiResponse) => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
    });
  }

  private randomTimestamp(): string {
    let char: string = "";
    let strings = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 6; i++) {
      char += strings.charAt(Math.floor(Math.random() * strings.length));
    }

    return char;
  }
}
