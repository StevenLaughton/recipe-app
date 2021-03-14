import { createAction, props } from '@ngrx/store';

export enum CategoryActions {
  GetCategoriesBegin = '[Categories] - Get categories begin',
  GetCategoriesSuccess = '[Categories] - Get categories success',
  GetCategoriesError = '[Categories] - Get categories error',
  GetCategories = '[Categories] - Get categories',
}

export const GetCategoriesAction = createAction(CategoryActions.GetCategories);

export const BeginGetCategoriesAction = createAction(
  CategoryActions.GetCategoriesBegin,
);

export const SuccessGetCategoriesAction = createAction(
  CategoryActions.GetCategoriesSuccess,
  props<{ payload: Array<string> }>(),
);

export const ErrorGetCategoriesAction = createAction(
  CategoryActions.GetCategoriesError,
  props<Error>(),
);
