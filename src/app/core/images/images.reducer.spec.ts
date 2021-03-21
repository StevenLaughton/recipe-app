import { ImagesReducer, initialState } from './images.reducer';

describe('Images Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = ImagesReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
