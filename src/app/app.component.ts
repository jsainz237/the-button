import { Component } from '@angular/core';
import { EventsService } from './events.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'the-button';

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
  }
}
