import { Component, OnInit } from '@angular/core';
import { 
  FormGroup,
  FormControl, 
  Validators
} from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { DataService } from '../services/data.service';

interface Channel {
  channelName: string;
  channelURL: string;
}

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  urlPattern = /^(http|https):\/\/[^ "]+$/;
  channelControl: FormGroup;
  channels: Channel[] = [
    {
      channelName: "RssFeed", 
      channelURL: "http://feeds.bbci.co.uk/news/business/rss.xml"
    },
    {
      channelName: "AtomFeed", 
      channelURL: "http://hayobethlehem.nl/feed/news.atom"
    }
  ];

  constructor(
    private _storageService: StorageService,
    private _dataService: DataService
  ) { }

  ngOnInit() {
    this.formCreate();
    this.getStoragedItems();
    this._dataService.getChannels(this.channels);
  }

  getStoragedItems() {
    const storagedItems = this._storageService.getItems("channels");

    this.channels = storagedItems !== null ? storagedItems : this.channels;
  }

  formCreate() {
    this.channelControl = new FormGroup({
      channelName: new FormControl(),
      channelURL: new FormControl('', [
        Validators.required,
        Validators.pattern(this.urlPattern)
      ])
    });
  }

  onSubmit() {
    const isValid: boolean = this.channelControl.valid;

    if (isValid) {
      const channelName: string = this.channelControl.value.channelName;
      const channelURL: string = this.channelControl.value.channelURL;
      const channel = { 
        channelName,
        channelURL
      };

      this.channels.unshift(channel);
      this._storageService.setItems("channels", this.channels);
      this._dataService.getChannels(this.channels);
    }
  }

  getURL(url: string) {
    this._dataService.getFeedByURL(url);
  }
}
