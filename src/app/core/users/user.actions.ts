import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ user: User; isLoggedIn: boolean }>(),
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>(),
);

export const signOut = createAction('[User] Sign Out');

export const signOutSuccess = createAction('[User] Sign Out Success');

export const signOutFailure = createAction(
  '[User] Sign Out Failure',
  props<{ error: string }>(),
);
