import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Rank } from 'src/types/rank';
import { EventsService } from '../../services/events.service';
import { setColor } from '../../state/color/color.actions';
import { ColorState } from 'src/state/color/color.reducer';

@Component({
  selector: 'app-color-bar',
  templateUrl: './color-bar.component.html',
  styleUrls: ['./color-bar.component.scss']
})
export class ColorBarComponent implements OnInit, OnDestroy {
  _resetListener: Subscription;
  _updateColorListener: Subscription;

  _colorSub: Subscription;
  color: Rank;
  index: number;

  barSectionWidth1: string;
  barSectionWidth2: string;

  constructor(
    private eventsService: EventsService,
    private store: Store<{ color: ColorState }>
  ) { }

  ngOnInit() {
    // ngrx store subscription
    this._colorSub = this.store.pipe(select('color')).subscribe(colorState => {
      if(colorState) {
        this.color = colorState.currentColor;
        this.index = colorState.currentIndex;

        this.barSectionWidth1 = `${100/13 * this.index}%`;
        this.barSectionWidth2 = `calc(${100/13 * (13 - this.index)}% + ${this.index === 0 ? '4px' : '0px'})`;
      }
    });

    // socket UPDATE_COLOR event subscription
    this._updateColorListener = this.eventsService.updateColorListener.subscribe(({ color, index }) => {
      this.store.dispatch(setColor({ color, index }))
    });
  }

  ngOnDestroy() {
    this._colorSub.unsubscribe();
    this._updateColorListener.unsubscribe();
  }
}
