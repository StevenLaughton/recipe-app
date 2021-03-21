import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromImages from './images.reducer';

export const selectImagesState = createFeatureSelector<fromImages.ImageState>(
  fromImages.imagesFeatureKey,
);

export const selectBase64string = createSelector(
  selectImagesState,
  (state: fromImages.ImageState) => state.base64String,
);

export const selectImageInStore = createSelector(
  selectImagesState,
  (state: fromImages.ImageState) => !!state.base64String,
);

export const selectDisplayString = createSelector(
  selectImagesState,
  (state: fromImages.ImageState) =>
    `data:image/jpeg;base64, ${state.base64String}`,
);
