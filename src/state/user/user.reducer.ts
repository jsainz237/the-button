import { createReducer, on } from '@ngrx/store';
import { setUser, clearUser } from './user.actions';
import { Rank } from 'src/types/rank';

export interface UserState {
    email: string;
    displayname: string;
    rank: Rank;
}

export const initalState: UserState = {
    email: null,
    displayname: null,
    rank: null
};

const _userReducer = createReducer(initalState,
    on(setUser, (state, payload) =>  {
        return { 
            email: payload.email,
            displayname: payload.displayname,
            rank: payload.rank 
        }
    }),
    on(clearUser, () => ({ email: null, displayname: null, rank: null }))
)

export function userReducer(state, action) {
    return _userReducer(state, action);
}
