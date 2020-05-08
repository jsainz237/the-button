import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';

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
