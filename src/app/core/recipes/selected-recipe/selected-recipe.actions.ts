import { createAction, props } from '@ngrx/store';
import { RecipeDto } from 'src/app/shared/models/recipe.dto.model';

export const setSelectedRecipe = createAction(
  '[SelectedRecipe] Set Selected Recipe',
  props<{ recipe: RecipeDto }>(),
);

export const setDisplayedPortions = createAction(
  '[SelectedRecipe] Set Displayed Portions',
  props<{ value: number }>(),
);

export const removeSelectedRecipe = createAction(
  '[SelectedRecipe] remove Selected Recipe',
);
