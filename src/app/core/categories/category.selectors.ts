import { createFeatureSelector } from '@ngrx/store';
import { CategoryState } from './category.reducer';

export interface AppState {
  categories: CategoryState;
}

export const getCategoriesState = createFeatureSelector<CategoryState>(
  'categories',
);
