import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {RecipeDto} from 'src/app/shared/models/recipe.dto.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Recipe} from '../shared/models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private db: AngularFirestore) {
  }

  get(id: string): Observable<Recipe | undefined> {
    return this.db.collection('recipes')
      .doc<Recipe>(id)
      .valueChanges();
  }

  getDto(id: string): Observable<RecipeDto | undefined> {
    return this.get(id)
      .pipe(map<(Recipe | undefined), (RecipeDto | undefined)>(recipe =>
        !!recipe ? new RecipeDto(recipe) : undefined
      ));
  }

  async addAsync(recipe: Recipe): Promise<string> {
    recipe.id = this.db.createId();
    await this.setDocAsync(recipe);
    return recipe.id;
  }

  async updateAsync(recipe: Recipe): Promise<string> {
    await this.setDocAsync(recipe);
    return recipe.id;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.db
        .collection('recipes')
        .doc<Recipe>(id)
        .delete();
      return true;
    } catch (err) {
      return false;
    }
  }

  private async setDocAsync(recipe: Recipe): Promise<boolean> {
    try {
      await this.db
        .collection<Recipe>('recipes')
        .doc(recipe.id)
        .set({...recipe});
      return true;
    } catch (err) {
      return false;
    }
  }
}
