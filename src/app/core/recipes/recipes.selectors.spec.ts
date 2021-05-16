import { EntityState } from '@ngrx/entity';
import { Recipe } from 'src/app/shared/models/recipe.model';
import * as fromRecipes from './recipes.reducer';
import { selectRecipesState } from './recipes.selectors';

describe('Recipes Selectors', () => {
  // const initialState: fromRecipes.RecipeState = {
  //   entities: [
  //     {
  //       id: '1',
  //       name: 'pulled pork 1',
  //       portions: 4,
  //       time: '15',
  //       category: 'pork',
  //       vegetarian: false,
  //       ingredients: ['1 kg boneless pork shoulder', '3 tbsp brown sugar'],
  //       steps: ['step1', 'step2', 'step3', 'step4', 'step5'],
  //     },
  //   ],
  //   collection: ['firstId'],
  //   isLoaded: false,
  //   selectedCategory: null,
  //   filterVegetarian: false,
  // };

  it('should select the feature state', () => {
    const result = selectRecipesState({
      [fromRecipes.recipesFeatureKey]: {},
    });

    //  expect(result).toEqual({});
  });
});
