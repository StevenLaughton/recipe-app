import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecipeDto } from '../shared/models/recipe.dto.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly filter: BehaviorSubject<string | undefined>;

  constructor(private db: AngularFirestore) {
    this.filter = new BehaviorSubject<string | undefined>(undefined);
  }

  getFilter(): BehaviorSubject<string | undefined> {
    return this.filter;
  }

  getCategories(): Observable<string[]> {
    return this.db
      .collection<RecipeDto>('recipes')
      .valueChanges()
      .pipe(
        map((recipe: RecipeDto[]) =>
          recipe
            .map((recipeDto: RecipeDto) => recipeDto.category)
            .filter((value, index, self) => self.indexOf(value) === index),
        ),
      );
  }

  applyFilter(category?: string): void {
    this.filter.next(category);
  }
}
