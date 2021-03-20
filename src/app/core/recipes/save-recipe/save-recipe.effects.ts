import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SaveRecipeActions from './save-recipe.actions';
import { ImageService } from 'src/app/services/image.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { ToastService } from 'src/app/services/toast.service';

@Injectable()
export class SaveRecipeEffects {
  saveRecipe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SaveRecipeActions.saveRecipe),
      concatMap((data) =>
        this.recipeService.save(data.recipe, data.editing).pipe(
          concatMap((recipe) =>
            this.imageService.add(recipe.id).pipe(
              map(() => SaveRecipeActions.saveRecipeSuccess()),
              tap(() => this.toastService.showMessage('Recipe Saved')),
            ),
          ),
          catchError((error) =>
            of(SaveRecipeActions.saveRecipeFailure({ error })),
          ),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private readonly recipeService: RecipeService,
    private readonly imageService: ImageService,
    private readonly toastService: ToastService,
  ) {}
}
