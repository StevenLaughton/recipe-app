import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable, of } from 'rxjs';
import { Photo } from '../shared/models/photo.model';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { last, map, mergeMap } from 'rxjs/operators';

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

  add(id: string): Observable<boolean> {
    if (this.photo) {
      return from(fetch(this.photo.webviewPath)).pipe(
        mergeMap((response) =>
          from(response.blob()).pipe(
            mergeMap((blob) =>
              this.afStorage
                .upload(`images/${id}`, blob)
                .snapshotChanges()
                .pipe(
                  last(),
                  map(() => true),
                ),
            ),
          ),
        ),
      );
    }
    return of(true);
  }

  get(recipeId: string): Observable<string | undefined> {
    return this.imageIds$.pipe(
      mergeMap((ids) =>
        ids.includes(recipeId)
          ? this.afStorage.ref(`images/${recipeId}`).getDownloadURL()
          : of(undefined),
      ),
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
