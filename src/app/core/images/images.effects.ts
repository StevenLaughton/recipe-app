import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as ImagesActions from './images.actions';
import { ImageService } from 'src/app/services/image.service';
import { select, Store } from '@ngrx/store';
import { selectBase64string } from './images.selectors';

@Injectable()
export class ImagesEffects {
  uploadImage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ImagesActions.upload),
      concatMap((upload) =>
        this.store.pipe(
          select(selectBase64string),
          mergeMap((base64String) =>
            base64String
              ? this.imageService.upload(upload.storageId, base64String).pipe(
                  map(() => ImagesActions.uploadSuccess),
                  catchError((error) =>
                    of(ImagesActions.uploadFailure({ error })),
                  ),
                )
              : ImagesActions.uploadSuccess,
          ),
        ),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly imageService: ImageService,
    private readonly store: Store,
  ) {}
}
