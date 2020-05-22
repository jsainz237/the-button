import { createAction, props } from '@ngrx/store';
import { FeedItem } from 'src/services/events.service';

export const setActivityFeed = createAction(
    '[ACTIVITIES] SET_ACTIVITY_FEED',
    props<{ feed: FeedItem[] }>()
);