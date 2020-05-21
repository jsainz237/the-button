import { createReducer, on } from '@ngrx/store';
import { setUser, updateUserRank, clearUser } from './user.actions';
import { User } from 'src/models/user';

export const initalState: User = {
    email: null,
    displayname: null,
    rank: null
};

const _userReducer = createReducer(initalState,
    on(setUser, (_, payload) =>  {
        return { 
            email: payload.email,
            displayname: payload.displayname,
            rank: payload.rank 
        }
    }),
    on(updateUserRank, (state, payload) => ({ ...state, rank: payload.rank })),
    on(clearUser, () => ({ email: null, displayname: null, rank: null }))
)

export function userReducer(state, action) {
    return _userReducer(state, action);
}
