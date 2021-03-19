import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as DeleteRecipeActions from './delete-recipe.actions';
import { RecipeService } from 'src/app/services/recipe.service';

@Injectable()
export class DeleteRecipeEffects {
  deleteRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeleteRecipeActions.deleteRecipe),
      concatMap((data) =>
        this.recipeService.delete(data.recipeId).pipe(
          map(() => DeleteRecipeActions.deleteRecipeSuccess()),
          catchError((error) =>
            of(DeleteRecipeActions.deleteRecipeFailure({ error })),
          ),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private readonly recipeService: RecipeService,
  ) {}
}
