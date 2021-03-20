import * as fromRecipes from './recipes.reducer';
import { selectRecipesState } from './recipes.selectors';

describe('Recipes Selectors', () => {
  it('should select the feature state', () => {
    const result = selectRecipesState({
      [fromRecipes.recipesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
