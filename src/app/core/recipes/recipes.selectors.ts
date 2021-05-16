import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeDto } from '../models/recipe.dto.model';
import { Recipe } from '../models/recipe.model';
import { selectRouteParams } from '../router.selector';
import * as fromRecipes from './recipes.reducer';

export const selectRecipesState =
  createFeatureSelector<fromRecipes.RecipeState>(fromRecipes.recipesFeatureKey);

export const recipesLoaded = createSelector(
  selectRecipesState,
  (recipe: fromRecipes.RecipeState) => recipe.isLoaded,
);

export const selectRecipes = createSelector(
  selectRecipesState,
  fromRecipes.selectAllRecipes,
);

export const selectCategory = createSelector(
  selectRecipesState,
  (recipe: fromRecipes.RecipeState) => recipe.selectedCategory,
);

export const selectRecipesWithCategory = createSelector(
  selectRecipes,
  selectCategory,
  (recipes: Array<Recipe>, selectedCategory: string | null) => {
    return !!selectedCategory
      ? recipes.filter((recipe: Recipe) => recipe.category === selectedCategory)
      : recipes;
  },
);

export const selectRecipeCategories = createSelector(
  selectRecipes,
  (recipes: Array<Recipe>) => [
    ...new Set(recipes.map((recipe: Recipe) => recipe.category)),
  ],
);

export const selectRecipeEntities = createSelector(
  selectRecipesState,
  fromRecipes.selectRecipeEntities,
);

export const selectRecipe = createSelector(
  selectRecipeEntities,
  selectRouteParams,
  (recipes: Dictionary<Recipe>, { id }) => recipes[id],
);

export const selectRecipeDto = createSelector(
  selectRecipeEntities,
  selectRouteParams,
  (recipes: Dictionary<Recipe>, { id }) => new RecipeDto(recipes[id]),
);

export const selectVegetarianFilter = createSelector(
  selectRecipesState,
  (recipe: fromRecipes.RecipeState) => recipe.filterVegetarian,
);
