import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, flatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as DeleteRecipeActions from './delete-recipe.actions';
import { RecipeService } from 'src/app/services/recipe.service';
import { ImageService } from 'src/app/services/image.service';
import { ToastService } from 'src/app/services/toast.service';

@Injectable()
export class DeleteRecipeEffects {
  deleteRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeleteRecipeActions.deleteRecipe),
      flatMap((data) => [
        this.imageService.delete(data.recipeId),
        this.recipeService.delete(data.recipeId),
      ]),
      map(() => DeleteRecipeActions.deleteRecipeSuccess()),
      tap(() => this.toastService.showMessageAndReturnToFeed('Recipe Deleted')),
      catchError((error) =>
        of(DeleteRecipeActions.deleteRecipeFailure({ error })),
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
