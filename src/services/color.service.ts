import { Injectable } from '@angular/core';
import { Rank } from 'src/models/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  color_mapping: Rank[];
  current_color: Subject<{ rank: Rank, index: number}>;
  current_color_index: number;
  timer: number;
  
  constructor() {
    this.color_mapping = [
      Rank.GRAY, 
      Rank.PURPLE, Rank.PURPLE, Rank.PURPLE,
      Rank.BLUE, Rank.BLUE,
      Rank.GREEN, Rank.GREEN,
      Rank.YELLOW, Rank.YELLOW,
      Rank.ORANGE, Rank.ORANGE,
      Rank.RED
    ];

    this.current_color = new Subject();
    this.current_color_index = 0;
  }

  /** Set time interval from random number of days */
  start_timer() {
    const countdown_days = Math.floor(Math.random() * 9) + 2;
    //const countdown_milliseconds = countdown_days * 86400000;
    const countdown_milliseconds = countdown_days * 10000;
    const countdown_interval = countdown_milliseconds / this.color_mapping.length;

    this.current_color.next({
      rank: Rank.GRAY,
      index: this.current_color_index
    });
    this.timer = window.setInterval(() => this.next_color(), countdown_interval)
  }

  /** go to next color / increase rank */
  private next_color() {
    if(this.current_color_index === this.color_mapping.length) {
      return this.current_color.complete();
    }
    this.current_color_index += 1;
    this.current_color.next({
      rank: this.color_mapping[this.current_color_index],
      index: this.current_color_index
    })
  }

  /** Reset color back to beginning */
  reset() {
    window.clearInterval(this.timer);
    this.current_color_index = 0;
    this.start_timer();
  }

}
