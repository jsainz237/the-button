import { Component, OnInit } from '@angular/core';
import { Rank } from 'src/models/user';
import { Subscription } from 'rxjs';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-color-bar',
  templateUrl: './color-bar.component.html',
  styleUrls: ['./color-bar.component.scss']
})
export class ColorBarComponent implements OnInit {
  _resetListener: Subscription;
  _deathListener: Subscription;
  _updateColorListener: Subscription;

  color: Rank;
  index: number;

  barSectionWidth1: string;
  barSectionWidth2: string;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this._updateColorListener = this.eventsService.updateColorListener.subscribe(({ color, index }) => {
      this.color = color;
      this.index = index;
      
      this.barSectionWidth1 = `${100/13 * this.index}%`;
      this.barSectionWidth2 = `calc(${100/13 * (13 - this.index)}% + ${this.index === 0 ? '4px' : '0px'})`;
    });
    
    this._deathListener = this.eventsService.resetListener.subscribe(() => console.log("DEATH HAPPENED X_X "));
  }
}
