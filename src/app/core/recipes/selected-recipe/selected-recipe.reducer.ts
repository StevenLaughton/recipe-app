import { createReducer, on } from '@ngrx/store';
import { RecipeDto } from 'src/app/shared/models/recipe.dto.model';
import * as SelectedRecipeActions from './selected-recipe.actions';

export const selectedRecipeFeatureKey = 'selectedRecipe';

export interface SelectedRecipeState {
  recipe: RecipeDto;
  selectedPortions: number;
}

export const initialState: SelectedRecipeState = {
  recipe: new RecipeDto(undefined),
  selectedPortions: 1,
};

export const SelectedRecipeReducer = createReducer(
  initialState,
  on(SelectedRecipeActions.setSelectedRecipe, (state, action) => {
    return { recipe: action.recipe, selectedPortions: action.recipe.portions };
  }),
  on(SelectedRecipeActions.removeSelectedRecipe, () => initialState),
  on(SelectedRecipeActions.setDisplayedPortions, (state, action) => {
    return {
      recipe: state.recipe,
      selectedPortions: action.value,
    };
  }),
);
