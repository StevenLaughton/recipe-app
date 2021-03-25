import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  user: User;
  isLoggedIn: boolean;
}

export const initialState: UserState = {
  user: new User(null),
  isLoggedIn: false,
};

export const UserReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, UserActions.signOutSuccess, () => initialState),
  on(UserActions.loadUsersSuccess, (state, action) => {
    return { user: action.user, isLoggedIn: action.isLoggedIn };
  }),
  on(UserActions.loadUsersFailure, (state, action) => {
    console.error(action.error);
    return initialState;
  }),
  on(UserActions.signOutFailure, (state, action) => {
    console.error(action.error);
    return state;
  }),
);
