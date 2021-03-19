import { createAction, props } from '@ngrx/store';

export const deleteRecipe = createAction(
  '[Delete/Recipe]  delete Recipe',
  props<{ recipeId: string }>(),
);

export const deleteRecipeSuccess = createAction(
  '[Delete/Recipe] delete Recipe Success',
);

export const deleteRecipeFailure = createAction(
  '[Delete/Recipe] delete Recipes Failure',
  props<{ error: any }>(),
);
