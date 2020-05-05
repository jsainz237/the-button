import { Component, OnInit } from '@angular/core';
import { ColorService } from '../color.service';
import { Rank } from 'src/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-color-bar',
  templateUrl: './color-bar.component.html',
  styleUrls: ['./color-bar.component.scss']
})
export class ColorBarComponent implements OnInit {
  _colorSub: Subscription;
  current_color: Rank;
  current_index: number;

  barSectionWidth1: string;
  barSectionWidth2: string;

  constructor(private colorService: ColorService) { }

  ngOnInit() {
    this._colorSub = this.colorService.current_color.subscribe(({ rank, index }) => {
      this.current_color = rank;
      this.current_index = index;
      
      this.barSectionWidth1 = `${100/13 * this.current_index}%`;
      this.barSectionWidth2 = `calc(${100/13 * (13 - this.current_index)}% + ${this.current_index === 0 ? '4px' : '0px'})`;
      console.log(this.barSectionWidth2);
    });
    this.colorService.start_timer();
  }

  reset() {
    this.colorService.reset();
  }
}
