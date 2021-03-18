import { RecipeState } from './recipes/recipes.reducer';
import { UserState } from './users/user.reducer';

export interface AppState {
  user: UserState;
  recipes: RecipeState;
}
