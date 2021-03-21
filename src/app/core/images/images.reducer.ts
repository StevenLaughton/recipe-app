import { Action, createReducer, on } from '@ngrx/store';
import * as ImagesActions from './images.actions';

export const imagesFeatureKey = 'images';

export interface ImageState {
  base64String: string | undefined;
}

export const initialState: ImageState = {
  base64String: undefined,
};

export const ImagesReducer = createReducer(
  initialState,

  on(ImagesActions.put, (state, action) => {
    return { base64String: action.base64String };
  }),
  on(ImagesActions.clear, () => initialState),
  on(ImagesActions.upload, (state) => state),
  on(ImagesActions.uploadSuccess, () => initialState),
  on(ImagesActions.uploadFailure, () => initialState),
);
