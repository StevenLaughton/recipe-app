import * as fromDeleteRecipe from './delete-recipe.actions';

describe('loadDeleteRecipes', () => {
  it('should return an action', () => {
    expect(fromDeleteRecipe.begin({ recipeId: '' }).type).toBe(
      '[Delete Recipe] Begin',
    );
  });
});
