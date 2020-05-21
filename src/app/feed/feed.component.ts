import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService, FeedItem } from 'src/services/events.service';
import { Subscription } from 'rxjs';
import { RankColorMap } from 'src/types/rank';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {
  feed: FeedItem[] = [];
  rankColorMap = RankColorMap;
  loaded: boolean;
  _sendFeedListener: Subscription;
  _resetListener: Subscription;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    console.log("INITTED")
    this.loaded = false;
    this._sendFeedListener = this.eventsService.sendFeedListener.subscribe(({ feed }) => {
      this.feed = feed;
      this.loaded = true;
    });
    this._resetListener = this.eventsService.resetListener.subscribe(({ feed }) => this.feed = feed);
  }

  ngOnDestroy(): void {
    this.loaded = false;
    this._sendFeedListener.unsubscribe();
    this._resetListener.unsubscribe();
  }

  /** calculate the opacity that the feed item should be based on index */
  calculateOpacity(index: number): number {
    switch(index) {
      case 0: return 1;
      case 1: return 0.5;
      case 2: return 0.3;
    }
  }
}
