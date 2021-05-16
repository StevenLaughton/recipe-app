import { initialState, RecipesReducer } from './recipes.reducer';

describe('Recipes Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = RecipesReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
