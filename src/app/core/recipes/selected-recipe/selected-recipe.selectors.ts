import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSelectedRecipe from './selected-recipe.reducer';

export const selectSelectedRecipeState = createFeatureSelector<fromSelectedRecipe.SelectedRecipeState>(
  fromSelectedRecipe.selectedRecipeFeatureKey,
);

export const selectPortionsMultiplier = createSelector(
  selectSelectedRecipeState,
  (recipeState: fromSelectedRecipe.SelectedRecipeState) => {
    return recipeState.selectedPortions / recipeState.recipe.portions;
  },
);

export const selectDisplayedPortions = createSelector(
  selectSelectedRecipeState,
  (state: fromSelectedRecipe.SelectedRecipeState) => state.selectedPortions,
);
