import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Recipe } from '../shared/models/recipe.model';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase';
import CollectionReference = firebase.firestore.CollectionReference;
import Query = firebase.firestore.Query;

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private readonly recipes$: Observable<Array<Recipe>>;
  private vegetarianFilter$: BehaviorSubject<boolean>;

  constructor(private readonly db: AngularFirestore) {
    this.vegetarianFilter$ = new BehaviorSubject<boolean>(false);

    this.recipes$ = combineLatest([this.vegetarianFilter$]).pipe(
      switchMap(([vegetarian]) =>
        db
          .collection<Recipe>('recipes', (ref) => {
            let query: CollectionReference | Query = ref;
            if (vegetarian) {
              query = query.where('vegetarian', '==', vegetarian);
            }
            return query;
          })
          .valueChanges(),
      ),
    );
  }

  get(): Observable<Array<Recipe>> {
    return this.recipes$;
  }

  filterByVegetarian(vegetarian: boolean): void {
    this.vegetarianFilter$.next(vegetarian);
  }
}
