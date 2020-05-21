import { createAction, props } from '@ngrx/store';
import { User } from 'src/models/user';
import { Rank } from 'src/types/rank';

export const setUser = createAction(
    '[User] SET_USER',
    props<User>()
);

export const updateUserRank = createAction(
    '[User] UPDATE_USER_RANK',
    props<{rank: Rank}>()
);

export const updateUserDisplayname = createAction(
    '[User] UPDATE_USER_DISPLAYNAME',
    props<{ displayname: string }>()
)

export const clearUser = createAction('[USER] CLEAR_USER');