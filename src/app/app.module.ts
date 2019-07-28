import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { 
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { 
  MatSelectModule, 
  MatInputModule,
  MatCardModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts-x';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StatisticsComponent } from './statistics/statistics.component';
import { AppComponent } from './app.component';
import { ChannelsComponent } from './channels/channels.component';
import { FeedComponent } from './feed/feed.component';

import { DataService } from './services/data.service';
import { StorageService } from './services/storage.service';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    ChannelsComponent,
    FeedComponent,
    StatisticsComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    ChartsModule
  ],
  providers: [ StorageService, DataService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
