import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { StorageService } from '../services/storage.service';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

const removeSpecialCharacters = /[&\/\\#,+()$~%.'":*?<>{}\s]/g;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public pieChartLabels: Label[];
  public pieChartData: number[];
  public pieChartType: ChartType = 'pie';
  public isSelected = false;
  public selectedMessage: object;

  constructor(
    private _dataService: DataService,
    private _storageService: StorageService
  ) { }

  ngOnInit() {
    this._dataService.selectedMessage.subscribe(selectedMessage => this.onMessageSelect(selectedMessage));
  }

  calcChannelNumber() {
    return this._dataService.channels.length;
  }

  calcAuthorNumber() {
    const feed = this._dataService.selectedFeed !== undefined ? this._dataService.selectedFeed : this._storageService.getItems("currentFeed");

    if (feed !== null) {
      return feed["items"]
        .map((item) => item.author)
        .filter((v, i, a) => a.indexOf(v) === i)
        .length;
    }
  }

  onMessageSelect(selectedMessage) {
    this.transformStringToChartValues(selectedMessage);
    this._storageService.setItems("selectedMessage", selectedMessage); 
    this.selectedMessage = selectedMessage;
    this.isSelected = true;
  }

  calcCharOccurances(selectedMessage) {
    const messageText = selectedMessage["title"] + selectedMessage["description"];
    const messageString = messageText.replace(removeSpecialCharacters, '').toLowerCase();

    return messageString.split("").reduce((a, letter) => {
      a[letter] = (a[letter] || 0) + 1;
      return a;
    }, {});
  }

  transformStringToChartValues(selectedMessage) {
    const message = this.calcCharOccurances(selectedMessage);

    this.pieChartLabels = Object.keys(message);
    this.pieChartData = Object.values(message);
  }
}
