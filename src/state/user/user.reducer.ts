import { createReducer, on } from '@ngrx/store';
import { setUser, SetUserPayload, clearUser } from './user.actions';

export interface UserState {
    id: string;
    username: string;
}

export const initalState: UserState = {
    id: null,
    username: null
};

const _userReducer = createReducer(initalState,
    on(setUser, (state, payload) =>  ({ id: payload.id, username: payload.username })),
    on(clearUser, () => ({ id: null, username: null }))
)

export function userReducer(state, action) {
    return _userReducer(state, action);
}
