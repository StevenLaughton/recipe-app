import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Recipe } from '../shared/models/recipe.model';
import firebase from 'firebase';
import Query = firebase.firestore.Query;

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly recipes$: Observable<Array<Recipe>>;
  private vegetarianFilter$: BehaviorSubject<boolean>;

  constructor(private db: AngularFirestore) {
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

  save(input: Recipe, editing: boolean): Observable<Recipe> {
    const recipe = this.setRecipe(input, editing);
    return of(recipe).pipe(
      tap((rec: Recipe) => this.setDoc(rec)),
      catchError((error) => of(error)),
    );
  }

  delete(id: string): void {
    this.db.collection('recipes').doc<Recipe>(id).delete();
  }

  get(): Observable<Array<Recipe>> {
    return this.recipes$;
  }

  filterByVegetarian(vegetarian: boolean): void {
    this.vegetarianFilter$.next(vegetarian);
  }

  private setDoc(recipe: Recipe): Promise<void> {
    return this.db
      .collection<Recipe>('recipes')
      .doc(recipe.id)
      .set({ ...recipe });
  }

  private setRecipe(input: Recipe, editing: boolean): Recipe {
    return new Recipe(
      editing === true ? input.id : this.db.createId(),
      input.name,
      input.portions,
      input.time,
      input.category,
      input.ingredients,
      input.vegetarian,
      input.steps,
    );
  }
}
