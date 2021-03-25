import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../../shared/models/recipe.model';
import { Store } from '@ngrx/store';
import { selectRecipe } from 'src/app/core/recipes/recipes.selectors';
import { saveRecipe } from 'src/app/core/recipes/save-recipe/save-recipe.actions';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage {
  recipe$: Observable<Recipe | undefined> = this.store.select(selectRecipe);

  constructor(private readonly store: Store) {}

  saveRecipe(recipe: Recipe): void {
    this.store.dispatch(saveRecipe({ recipe: recipe, editing: true }));
  }
}
