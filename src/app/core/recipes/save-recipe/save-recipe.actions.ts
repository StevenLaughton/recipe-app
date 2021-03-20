import { createAction, props } from '@ngrx/store';
import { Recipe } from 'src/app/shared/models/recipe.model';

export const saveRecipe = createAction(
  '[Recipes] Save Recipe',
  props<{ recipe: Recipe; editing: boolean }>(),
);

export const saveRecipeSuccess = createAction('[Recipes] Save Recipe Success');

export const saveRecipeFailure = createAction(
  '[Recipes] Save Recipe Failure',
  props<{ error: Error }>(),
);
