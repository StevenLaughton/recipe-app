import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState } from './category.reducer';
import * as fromCategories from './category.reducer';
export interface AppState {
  categories: CategoryState;
}

export const getCategoriesState = createFeatureSelector<CategoryState>(
  'Categories',
);
export const getCategories = createSelector(
  getCategoriesState,
  fromCategories.getAllCategories,
);
export const getLoading = createSelector(
  getCategoriesState,
  fromCategories.getLoading,
);
export const getError = createSelector(
  getCategoriesState,
  fromCategories.getError,
);
