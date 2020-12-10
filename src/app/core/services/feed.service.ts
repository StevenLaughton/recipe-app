import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Recipe} from '../../shared/models/recipe.model';
import {switchMap} from 'rxjs/operators';
import firebase from 'firebase';
import CollectionReference = firebase.firestore.CollectionReference;
import Query = firebase.firestore.Query;


@Injectable({
    providedIn: 'root',
})
export class FeedService {
    private readonly recipes$: Observable<Recipe[]>;
    private categoryFilter$: BehaviorSubject<string | null>;
    private vegetarianFilter$: BehaviorSubject<boolean>;

    constructor(private db: AngularFirestore) {
        console.log('constructing: FeedService');
        this.categoryFilter$ = new BehaviorSubject<string | null>(null);
        this.vegetarianFilter$ = new BehaviorSubject<boolean>(false);

        this.recipes$ = combineLatest(
            this.categoryFilter$,
            this.vegetarianFilter$
        ).pipe(
            switchMap(([category, vegetarian]) =>
                db.collection<Recipe>('recipes', ref => {
                    let query: CollectionReference | Query = ref;
                    if (category) {
                        query = query.where('category', '==', category);
                    }
                    if (vegetarian) {
                        query = query.where('vegetarian', '==', vegetarian);
                    }
                    return query;
                }).valueChanges()
            )
        );
    }

    get(): Observable<Recipe[]> {
        console.log('FeedService: Get()');
        return this.recipes$;
    }

    filterByCategory(category: string | null): void {
        this.categoryFilter$.next(category);
    }

    filterByVegetarian(vegetarian: boolean): void {
        this.vegetarianFilter$.next(vegetarian);
    }

}

