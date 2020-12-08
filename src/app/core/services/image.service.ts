import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable, of} from 'rxjs';
import {Photo} from '../../shared/models/photo.model';
import {CameraResultType, CameraSource, Plugins} from '@capacitor/core';
import {map, take} from 'rxjs/operators';


const {Camera} = Plugins;

@Injectable({
    providedIn: 'root'
})
export class ImageService implements OnDestroy {
    public photo: Photo | undefined;
    private imageIds$: Observable<string[]>;

    constructor(
        private afStorage: AngularFireStorage) {
        this.imageIds$ = this.afStorage.ref('images/').listAll()
            .pipe(map(ref =>
                ref.items.map(a => a.name)
            ));
    }

    async add(recipeId: string): Promise<Observable<number | undefined>> {
        if (this.photo) {
            const response = await fetch(this.photo.webviewPath);
            const blob = await response.blob();

            const task = this.afStorage.upload(`images/${recipeId}`, blob);
            return task.percentageChanges();
        }
        return of(undefined);
    }

    get(recipeId: string): Promise<Observable<string>> | undefined {
        return new Promise((resolve) => {
            this.imageIds$
                .pipe(
                    take(1)
                )
                .subscribe((imageIds: string[]) => {
                    if (imageIds.indexOf(recipeId) !== -1) {
                        resolve(this.afStorage.ref(`images/${recipeId}`).getDownloadURL());
                    }
                    resolve(undefined);
                });
        });
    }


    delete(recipeId: string): void {
        this.afStorage.ref(`images/${recipeId}`).delete();
    }

    async addToStorage(): Promise<void> {
        const capturedPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });

        this.photo = new Photo(
            'temp.jpeg',
            capturedPhoto.webPath ?? ''
        );
    }


    async deleteFromStorage(): Promise<void> {
        this.photo = undefined;
    }

    ngOnDestroy(): void {
    }
}
