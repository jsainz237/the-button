import { Component } from '@angular/core';
import { EventsService, ResetEventResponse } from './events.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'the-button';
  rank_gain: Observable<ResetEventResponse>;
  _rankSub: Subscription;
  user: ResetEventResponse;

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.rank_gain = this.eventsService.rank_gain;
    this._rankSub = this.rank_gain.subscribe(val => this.user = val);
    console.log(this.rank_gain)
    //this.eventsService.send_press_event();
  }
}
