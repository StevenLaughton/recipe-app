import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface UserState extends EntityState<User> {}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserState = adapter.getInitialState();

export const UserReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, () => adapter.getInitialState()),
  on(UserActions.loadUsersSuccess, (state, action) =>
    adapter.setAll([action.data], state),
  ),
  on(UserActions.loadUsersFailure, (state, action) => {
    console.error(action.error);
    return adapter.removeAll(state);
  }),
);
