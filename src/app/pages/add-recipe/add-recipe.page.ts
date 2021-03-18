import { Component } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { Store } from '@ngrx/store';
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
