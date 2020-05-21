import { createAction, props } from '@ngrx/store';
import { Rank } from 'src/types/rank';

export interface SetUserPayload {
    displayname: string;
    rank: Rank;
};

export const setUser = createAction(
    '[User] SET_USER',
    props<SetUserPayload>()
);

export const clearUser = createAction('[USER] CLEAR_USER');