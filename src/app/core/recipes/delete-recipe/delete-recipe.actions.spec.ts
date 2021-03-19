import * as fromDeleteRecipe from './delete-recipe.actions';

describe('loadDeleteRecipes', () => {
  it('should return an action', () => {
    expect(fromDeleteRecipe.loadDeleteRecipes().type).toBe('[DeleteRecipe] Load DeleteRecipes');
  });
});
