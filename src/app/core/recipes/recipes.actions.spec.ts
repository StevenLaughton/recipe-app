import * as fromRecipes from './recipes.actions';

describe('loadRecipess', () => {
  it('should return an action', () => {
    expect(fromRecipes.loadRecipes().type).toBe('[Recipes] Load Recipes');
  });
});
