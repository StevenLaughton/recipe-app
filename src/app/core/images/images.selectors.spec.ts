import * as fromImages from './images.reducer';
import { selectImagesState } from './images.selectors';

describe('Images Selectors', () => {
  it('should select the feature state', () => {
    const result = selectImagesState({
      [fromImages.imagesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
