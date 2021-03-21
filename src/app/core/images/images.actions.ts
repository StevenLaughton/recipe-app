import { createAction, props } from '@ngrx/store';

export const put = createAction(
  '[Images] Put',
  props<{ base64String: string | undefined}>(),
);

export const clear = createAction('[Images] Clear');

export const upload = createAction(
  '[Images] Upload',
  props<{ storageId: string }>(),
);

export const uploadSuccess = createAction('[Images] Upload Success');

export const uploadFailure = createAction(
  '[Images] Upload Failure',
  props<{ error: Error }>(),
);
