import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  public feedList: [];

  constructor(
    private _dataService: DataService,
    private _storageService: StorageService
    ) { }

  ngOnInit() {
    this.getStoragedItems();
  }

  getStoragedItems() {
    const storagedItems = this._storageService.getItems("currentFeed");

    this.feedList = storagedItems !== null ? storagedItems.items : this._dataService.selectedFeed;
  }

  isSelected() {
    const feed: object = this._dataService.selectedFeed;
    const storagedItems: object = this._storageService.getItems("currentFeed");

    if (typeof feed !== "undefined") {
      this._storageService.setItems("currentFeed", feed);

      return this.feedList = feed["items"];
    }

    if (storagedItems !== null) {
      return this.feedList;
    }
  }

  getSelectedMessage(message: object) {
    this._dataService.selectedMessage.next(message);
  }

}
