import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { Photo } from '../../shared/models/photo.model';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { map, mergeMap } from 'rxjs/operators';

const { Camera } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  public photo: Photo | undefined;
  private imageIds$: Observable<string[]>;

  constructor(private afStorage: AngularFireStorage) {
    this.imageIds$ = this.afStorage
      .ref('images/')
      .listAll()
      .pipe(map((ref) => ref.items.map((id) => id.name)));
  }

  async add(recipeId: string): Promise<Observable<boolean>> {
    if (this.photo) {
      const response = await fetch(this.photo.webviewPath);
      const blob = await response.blob();

      const task = this.afStorage.upload(`images/${recipeId}`, blob);
      return task.percentageChanges().pipe(
        map((percent) => {
          return percent === 100 ? true : false;
        }),
      );
    }
    return of(true);
  }

  get(recipeId: string): Observable<string | undefined> {
    return this.imageIds$.pipe(
      mergeMap((ids) => {
        if (ids.includes(recipeId)) {
          return this.afStorage.ref(`images/${recipeId}`).getDownloadURL();
        }
        return of(undefined);
      }),
    );
  }

  delete(recipeId: string): void {
    this.afStorage.ref(`images/${recipeId}`).delete();
  }

  async addToStorage(): Promise<void> {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 75,
    });

    this.photo = new Photo('temp.jpeg', capturedPhoto.webPath ?? '');
  }

  async deleteFromStorage(): Promise<void> {
    this.photo = undefined;
  }
}
