import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService, FeedItem } from 'src/services/events.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { updateUserRank } from 'src/state/user/user.actions';
import { setActivityFeed } from 'src/state/activities/activities.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'the-button';
  _setUserColorListener: Subscription;
  _sendFeedListener: Subscription;
  _resetListener: Subscription;

  constructor(
    private eventsService: EventsService,
    private store: Store,
  ) {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  ngOnInit() {
    this._setUserColorListener = this.eventsService.setUserColorListener.subscribe(({ rank }) => {
      this.store.dispatch(updateUserRank({ rank }));
    });

    this._sendFeedListener = this.eventsService.sendFeedListener.subscribe(({ feed }) => {
      this.store.dispatch(setActivityFeed({ feed }));
    })

    this._resetListener = this.eventsService.resetListener.subscribe(({ feed }) => {
      this.store.dispatch(setActivityFeed({ feed }));
    })
  }

  ngOnDestroy() {
    this._setUserColorListener.unsubscribe();
    this._sendFeedListener.unsubscribe();
    this._resetListener.unsubscribe();
  }
}
