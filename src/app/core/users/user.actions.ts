import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

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
  '[User] LSign Out Failure',
  props<{ error: string }>(),
);
