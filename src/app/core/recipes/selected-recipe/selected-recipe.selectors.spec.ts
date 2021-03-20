import * as fromSelectedRecipe from './selected-recipe.reducer';
import { selectSelectedRecipeState } from './selected-recipe.selectors';

describe('SelectedRecipe Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSelectedRecipeState({
      [fromSelectedRecipe.selectedRecipeFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
