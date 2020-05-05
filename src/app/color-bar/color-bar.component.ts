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
  color_mapping: Rank[];

  constructor(private colorService: ColorService) { }

  ngOnInit() {
    this.color_mapping = this.colorService.color_mapping;
    this._colorSub = this.colorService.current_color.subscribe(({ rank, index }) => {
      this.current_color = rank;
      this.current_index = index;
    });
    this.colorService.start_timer();
  }

  reset() {
    this.colorService.reset();
  }
}
