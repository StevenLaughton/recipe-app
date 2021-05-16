import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Recipe } from 'src/app/core/models/recipe.model';
import { saveRecipe } from 'src/app/core/recipes/save-recipe/save-recipe.actions';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.page.html',
  styleUrls: ['./add-recipe.page.scss'],
})
export class AddRecipePage {
  constructor(private readonly store: Store) {}

  saveRecipe(recipe: Recipe): void {
    this.store.dispatch(saveRecipe({ recipe: recipe, editing: false }));
  }
}
