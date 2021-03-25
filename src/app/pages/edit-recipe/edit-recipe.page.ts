import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from '../../shared/models/recipe.model';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectRecipe } from 'src/app/core/recipes/recipes.selectors';
import { saveRecipe } from 'src/app/core/recipes/save-recipe/save-recipe.actions';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {
  recipe$: Observable<Recipe | undefined> = of(undefined);

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit() {
    this.recipe$ = this.route.paramMap.pipe(
      mergeMap((params) => {
        const id = params.get('id');
        return !!id
          ? this.store.select(selectRecipe, id)
          : this.toastService
              .showMessageAndReturnToFeed(
                'An error occurred getting the recipe',
              )
              .then(() => undefined);
      }),
    );
  }

  saveRecipe(recipe: Recipe): void {
    this.store.dispatch(saveRecipe({ recipe: recipe, editing: true }));
  }
}
