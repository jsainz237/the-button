import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService, FeedItem } from 'src/services/events.service';
import { Subscription } from 'rxjs';
import { RankColorMap } from 'src/types/rank';
import { Store, select } from '@ngrx/store';
import { ActivitiesState } from 'src/state/activities/activities.reducer';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {
  feed: FeedItem[];
  rankColorMap = RankColorMap;
  _feedListener: Subscription;

  constructor(
    private eventsService: EventsService,
    private store: Store<{ activities: ActivitiesState }>
  ) { }

  ngOnInit(): void {
    this._feedListener = this.store.pipe(select('activities')).subscribe(({ feed }) => this.feed = feed);
  }

  ngOnDestroy(): void {
    this._feedListener.unsubscribe();
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
