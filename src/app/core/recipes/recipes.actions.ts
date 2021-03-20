import { createAction, props } from '@ngrx/store';
import { Recipe } from 'src/app/shared/models/recipe.model';

export const loadRecipes = createAction('[Recipes] Load Recipes');

export const loadRecipesSuccess = createAction(
  '[Recipes] Load Recipes Success',
  props<{ recipes: Array<Recipe> }>(),
);

export const loadRecipesFailure = createAction(
  '[Recipes] Load Recipes Failure',
  props<{ error: Error }>(),
);

export const setSelectedCategory = createAction(
  '[Recipes] Set Selected Category',
  props<{ category: string | null }>(),
);

export const toggleFilterVegetarian = createAction(
  '[Recipes] Toggle Filter Vegetarian',
);
