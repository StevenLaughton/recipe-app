import { Action, createReducer, on } from '@ngrx/store';
import * as CategoryActions from './category.actions';

export interface CategoryState {
  items: Array<string>;
  loading: boolean;
  error: any;
}

export const initialState: CategoryState = {
  items: Array<string>(),
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(CategoryActions.GetCategoriesAction, (state: CategoryState) => state),
  on(CategoryActions.BeginGetCategoriesAction, (state: CategoryState) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(
    CategoryActions.SuccessGetCategoriesAction,
    (state: CategoryState, { payload }) => {
      return {
        ...state,
        items: [...payload],
        error: null,
        loading: false,
      };
    },
  ),
  on(CategoryActions.ErrorGetCategoriesAction, (state, error) => {
    console.error(error);
    return {
      ...state,
      loading: false,
      error: error,
    };
  }),
);

export function CategoryReducer(
  state: CategoryState | undefined,
  action: Action,
): CategoryState {
  return reducer(state, action);
}
