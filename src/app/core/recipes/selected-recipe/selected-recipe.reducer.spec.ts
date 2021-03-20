import { initialState, SelectedRecipeReducer } from './selected-recipe.reducer';

describe('SelectedRecipe Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = SelectedRecipeReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
