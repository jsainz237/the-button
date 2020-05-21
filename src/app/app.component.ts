import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from 'src/services/events.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from 'src/models/user';
import { updateUserRank } from 'src/state/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'the-button';
  _setUserColorListener: Subscription;

  constructor(
    private eventsService: EventsService,
    private store: Store<{ user: User }>,
  ) {}

  ngOnInit() {
    this._setUserColorListener = this.eventsService.setUserColorListener
      .subscribe(({ rank }) => 
        this.store.dispatch(updateUserRank({ rank }))
      );
  }

  ngOnDestroy() {
    this._setUserColorListener.unsubscribe();
  }
}
