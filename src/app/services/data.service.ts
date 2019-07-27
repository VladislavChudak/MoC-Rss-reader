import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const serviceApiKey: string = 'bcmhlky6bnezookiy7ryfrlvagck6zrha10h7qba';
const params = new HttpParams().set('api_key', serviceApiKey).set('count', '');
const rssToJsonApi: string = 'https://api.rss2json.com/v1/api.json?rss_url=';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedFeed: object;
  selectedMessage: object;
  channels: [];

  constructor(private _httpClient: HttpClient) { }

  getFeedByURL(url: string) {
    this._httpClient.get(rssToJsonApi + url, { params: params })
      .subscribe(feed => this.selectedFeed = feed)
  }

  getMessage(message: object) {
    this.selectedMessage = message;
  }

  getChannels(channels) {
    this.channels = channels;
  }
}
