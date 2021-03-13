import { createAction, props } from '@ngrx/store';

export enum CategoryActions {
  LoadDataBegin = '[Categories] Load categories begin',
  LoadDataSuccess = '[Categories] Load categories success',
  LoadDataFailure = '[Categories] Load categories failure',
}

export const loadDataBegin = createAction(CategoryActions.LoadDataBegin);

export const loadDataSuccess = createAction(
  CategoryActions.LoadDataSuccess,
  props<{ categories: string[] }>(),
);

export const loadDataFailure = createAction(
  CategoryActions.LoadDataFailure,
  props<{ error: string }>(),
);
