import * as fromSaveRecipe from './save-recipe.actions';

describe('loadSaveRecipes', () => {
  it('should return an action', () => {
    expect(fromSaveRecipe.saveRecipeSuccess().type).toBe(
      '[Recipes] Save Recipe Success',
    );
  });
});
