import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Recipe} from '../../shared/models/recipe.model';
import firebase from 'firebase';


@Injectable({
    providedIn: 'root',
})
export class FeedService {
    constructor(private db: AngularFirestore) {
    }

    get(category?: string): Observable<Recipe[]> {
        return this.db.collection<Recipe>('recipes',
            ref => {
                if (category) {
                    return ref.where('category', '==', category);
                }
                return ref;
            }).valueChanges();
    }

}

