import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isDead: boolean = false;
  _deathListener: Subscription;
  gifLink: string = "https://media.giphy.com/media/3o7aCTNjq3qiUbzrHi/giphy.gif"

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this._deathListener = this.eventsService.deathListener.subscribe(() => {
      this.isDead = true;
      console.log("The Button is dead! Long live The Button!");
    });
  }

}
