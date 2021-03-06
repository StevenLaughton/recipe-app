import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import firebase from 'firebase';
import Query = firebase.firestore.Query;
import { selectVegetarianFilter } from '../core/recipes/recipes.selectors';
import { select, Store } from '@ngrx/store';
import { Recipe } from '../core/models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly recipes$: Observable<Array<Recipe>>;
  private vegetarianFilter$: Observable<boolean> = this.store.pipe(
    select(selectVegetarianFilter),
  );

  constructor(
    private readonly db: AngularFirestore,
    private readonly store: Store,
  ) {
    this.recipes$ = this.vegetarianFilter$.pipe(
      switchMap((vegetarian) =>
        db
          .collection<Recipe>('recipes', (ref) => {
            let query: CollectionReference | Query = ref;
            return vegetarian
              ? (query = query.where('vegetarian', '==', vegetarian))
              : query;
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

  delete(id: string): Observable<void> {
    return from(this.db.collection('recipes').doc<Recipe>(id).delete());
  }

  get(): Observable<Array<Recipe>> {
    return this.recipes$;
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
