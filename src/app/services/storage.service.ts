import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getItems(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  setItems(key, channels) {
    localStorage.setItem(key, JSON.stringify(channels));
  }
}
