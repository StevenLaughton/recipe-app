import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.UserState>(
  fromUser.userFeatureKey,
);
export const selectCurrentUser = createSelector(
  selectUserState,
  (state: fromUser.UserState) => state.user,
);

export const isLoggedIn = createSelector(
  selectUserState,
  (user: fromUser.UserState) => user.isLoggedIn,
);
