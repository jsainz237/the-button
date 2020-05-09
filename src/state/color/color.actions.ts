import { createAction, props } from '@ngrx/store';
import { Rank } from 'src/models/user';

export interface ColorStatePayload {
    color: Rank;
    index: number;
}

export const setColor = createAction(
    '[Color] SET_COLOR',
    props<ColorStatePayload>()
)