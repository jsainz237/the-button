import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Observable, Subscription } from 'rxjs';
import { ColorService } from '../color.service';

@Component({
  selector: 'app-the-button',
  templateUrl: './the-button.component.html',
  styleUrls: ['./the-button.component.scss']
})
export class TheButtonComponent implements OnInit {

  constructor( private eventsService: EventsService ) { }

  ngOnInit() {
  }

  pressButton() {
    this.eventsService.sendPressEvent();
  }

}
