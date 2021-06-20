import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable, of } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { last, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private afStorage: AngularFireStorage) {}

  upload(id: string, photo64: string): Observable<boolean> {
    return this.afStorage
      .ref(`images/${id}`)
      .putString(photo64, 'base64', { contentType: 'image/jpeg' })
      .snapshotChanges()
      .pipe(
        last(),
        map(() => true),
      );
  }

  hasImage(recipeId: string): Observable<boolean> {
    return this.afStorage
      .ref('images/')
      .listAll()
      .pipe(
        map((ref) => ref.items.map((id) => id.name)),
        map((ids) => (ids.includes(recipeId) ? true : false)),
      );
  }

  delete(recipeId: string): Observable<void> {
    return from(this.afStorage.ref(`images/${recipeId}`).delete());
  }
}
