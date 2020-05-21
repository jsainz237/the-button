import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Store, select } from '@ngrx/store';
import { User } from 'src/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-the-button',
  templateUrl: './the-button.component.html',
  styleUrls: ['./the-button.component.scss']
})
export class TheButtonComponent implements OnInit, OnDestroy {
  user: User;
  _userSub: Subscription;

  constructor(
    private eventsService: EventsService,
    private store: Store<{ user: User }>
  ) { }

  ngOnInit() {
    this._userSub = this.store.pipe(select('user')).subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this._userSub.unsubscribe();
  }

  pressButton() {
    this.eventsService.sendPressEvent(this.user.email);
  }

}
