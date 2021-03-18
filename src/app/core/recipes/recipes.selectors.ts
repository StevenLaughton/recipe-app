import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeDto } from 'src/app/shared/models/recipe.dto.model';
import { Recipe } from 'src/app/shared/models/recipe.model';
import * as fromRecipes from './recipes.reducer';

export const selectRecipesState = createFeatureSelector<fromRecipes.RecipeState>(
  fromRecipes.recipesFeatureKey,
);

export const recipesLoaded = createSelector(
  selectRecipesState,
  fromRecipes.getIsLoaded,
);

export const selectRecipes = createSelector(
  selectRecipesState,
  fromRecipes.selectAllRecipes,
);

export const selectCategory = createSelector(
  selectRecipesState,
  fromRecipes.getSelectedCategory,
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
  (recipes: Array<Recipe>) =>
    recipes
      .map<string>((recipeDto: Recipe) => recipeDto.category)
      .filter((value, index, self) => self.indexOf(value) === index),
);

export const selectRecipeEntities = createSelector(
  selectRecipesState,
  fromRecipes.selectRecipeEntities,
);

export const selectRecipe = createSelector(
  selectRecipeEntities,
  (recipes: Dictionary<Recipe>, id: string) => recipes[id],
);

export const selectRecipeDto = createSelector(
  selectRecipeEntities,
  (recipes: Dictionary<Recipe>, id: string) => new RecipeDto(recipes[id]),
);
