import { createFeatureSelector } from '@ngrx/store';
import { CategoryState } from './category.reducer';

export const getCategoriesState = createFeatureSelector<CategoryState>(
  'categories',
);
