import * as fromDeleteRecipe from './delete-recipe.actions';

describe('loadDeleteRecipes', () => {
  it('should return an action', () => {
    expect(fromDeleteRecipe.deleteRecipe({ recipeId: '' }).type).toBe(
      '[Delete/Recipe]  delete Recipe',
    );
  });
});
