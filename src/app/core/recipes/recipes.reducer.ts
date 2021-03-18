import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Recipe } from 'src/app/shared/models/recipe.model';
import * as RecipesActions from './recipes.actions';

export const recipesFeatureKey = 'recipes';

export interface RecipeState extends EntityState<Recipe> {
  isLoaded: boolean;
  selectedCategory: string | null;
}

export const adapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>();

export const initialState: RecipeState = adapter.getInitialState({
  isLoaded: false,
  selectedCategory: null,
});

export const RecipesReducer = createReducer(
  initialState,

  on(RecipesActions.loadRecipes, (state) => state),
  on(RecipesActions.loadRecipesSuccess, (state, action) => {
    return adapter.setAll(action.recipes, {
      ...state,
      isLoaded: true,
      selectedCategory: state.selectedCategory,
    });
  }),
  on(RecipesActions.loadRecipesFailure, (state, action) => {
    console.error(action.error);
    return adapter.removeAll({
      ...state,
      isLoaded: true,
      selectedCategory: state.selectedCategory,
    });
  }),
  on(RecipesActions.setSelectedCategory, (state, action) => {
    return {
      ...state,
      isLoaded: state.isLoaded,
      selectedCategory: action.category,
    };
  })
);

export const getIsLoaded = (state: RecipeState) => state.isLoaded;

export const getSelectedCategory = (state: RecipeState) =>
  state.selectedCategory;

export const selectUserIds = adapter.getSelectors().selectIds;

export const selectRecipeEntities = adapter.getSelectors().selectEntities;

export const selectAllRecipes = adapter.getSelectors().selectAll;
