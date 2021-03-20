import { RecipeState } from './recipes/recipes.reducer';
import { SelectedRecipeState } from './recipes/selected-recipe/selected-recipe.reducer';
import { UserState } from './users/user.reducer';

export interface AppState {
  user: UserState;
  recipes: RecipeState;
  selectedRecipe: SelectedRecipeState;
}
