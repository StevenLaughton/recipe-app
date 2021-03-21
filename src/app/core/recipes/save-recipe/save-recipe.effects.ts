import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SaveRecipeActions from './save-recipe.actions';
import { RecipeService } from 'src/app/services/recipe.service';
import { ToastService } from 'src/app/services/toast.service';
import * as ImageActions from '../../images/images.actions';

@Injectable()
export class SaveRecipeEffects {
  saveRecipe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SaveRecipeActions.saveRecipe),
      concatMap((data) =>
        this.recipeService.save(data.recipe, data.editing).pipe(
          map((recipe) => ImageActions.upload({ storageId: recipe.id })),
          tap(() => SaveRecipeActions.saveRecipeSuccess()),
          tap(() =>
            this.toastService.showMessageAndReturnToFeed('Recipe Saved'),
          ),
          catchError((error) =>
            of(SaveRecipeActions.saveRecipeFailure({ error })),
          ),
        ),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly recipeService: RecipeService,
    private readonly toastService: ToastService,
  ) {}
}
