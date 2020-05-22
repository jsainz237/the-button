import { createReducer, on } from "@ngrx/store"
import { setActivityFeed } from './activities.actions'
import { FeedItem } from 'src/services/events.service';

export interface ActivitiesState {
    feed: FeedItem[];
}

const initalState: ActivitiesState = {
    feed: null
}

const _activitiesReducer = createReducer(initalState,
    on(setActivityFeed, (_, payload) =>  {
        console.log(payload.feed);
        return { feed: payload.feed };
    }),
)

export function activitiesReducer(state, action) {
    return _activitiesReducer(state, action);
}