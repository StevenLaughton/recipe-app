import { createAction, props } from '@ngrx/store';

export const begin = createAction(
  '[Delete Recipe] Begin',
  props<{ recipeId: string }>(),
);

export const success = createAction('[Delete Recipe] Success');

export const failure = createAction(
  '[Delete Recipe] Failure',
  props<{ error: any }>(),
);
