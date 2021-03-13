import { createReducer, on } from '@ngrx/store';
import {
  loadDataBegin,
  loadDataFailure,
  loadDataSuccess,
} from './category.actions';

export interface CategoryState {
  items: string[];
  loading: boolean;
  error: any;
}

export const initialState: CategoryState = {
  items: [],
  loading: false,
  error: null,
};

export const categoryReducer = createReducer(
  initialState,
  on(loadDataBegin, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadDataSuccess, (state, { categories }) => ({
    ...state,
    loading: false,
    items: categories,
  })),
  on(loadDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
);

export const getAllCategories = (state: CategoryState) => state.items;
export const getLoading = (state: CategoryState) => state.loading;
export const getError = (state: CategoryState) => state.error;
