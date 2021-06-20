import { Component, OnDestroy } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/core';
import { Store } from '@ngrx/store';
import * as fromImages from 'src/app/core/images/images.actions';
import {
  selectDisplayString,
  selectImageInStore,
} from 'src/app/core/images/images.selectors';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnDestroy {
  imageInStore$ = this.store.select(selectImageInStore);
  image$ = this.store.select(selectDisplayString);

  constructor(private readonly store: Store) {}

  ngOnDestroy(): void {
    this.clearImageStore();
  }

  async addToStorage(): Promise<void> {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      quality: 75,
    });

    this.store.dispatch(
      fromImages.put({ base64String: capturedPhoto.base64String }),
    );
  }

  clearImageStore(): void {
    this.store.dispatch(fromImages.clear());
  }
}
