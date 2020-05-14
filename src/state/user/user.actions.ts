import { createAction, props } from '@ngrx/store';

export interface SetUserPayload {
    id: string;
    username: string;
};

export const setUser = createAction(
    '[User] SET_USER',
    props<SetUserPayload>()
);

export const clearUser = createAction('[USER] CLEAR_USER');