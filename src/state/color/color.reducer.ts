import { createReducer, on } from '@ngrx/store';
import { setColor } from './color.actions';
import { Rank } from 'src/models/user';

export interface ColorState {
    currentColor: Rank;
    currentIndex: number;
}

export const initalState: ColorState = null;

const _colorReducer = createReducer(initalState,
    on(setColor, (state, payload) =>  ({ currentColor: payload.color, currentIndex: payload.index }))
)

export function colorReducer(state, action) {
    return _colorReducer(state, action);
}