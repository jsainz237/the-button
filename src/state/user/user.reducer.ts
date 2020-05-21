import { createReducer, on } from '@ngrx/store';
import { setUser, clearUser } from './user.actions';
import { Rank } from 'src/types/rank';

export interface UserState {
    displayname: string;
    rank: Rank;
}

export const initalState: UserState = {
    displayname: null,
    rank: null
};

const _userReducer = createReducer(initalState,
    on(setUser, (state, payload) =>  {
        console.log(payload)
        return { displayname: payload.displayname, rank: payload.rank }
    }),
    on(clearUser, () => ({ displayname: null, rank: null }))
)

export function userReducer(state, action) {
    return _userReducer(state, action);
}
