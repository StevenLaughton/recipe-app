import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as RecipesActions from './recipes.actions';
import { RecipeService } from 'src/app/services/recipe.service';

@Injectable()
export class RecipesEffects {
  loadRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.loadRecipes),
      concatMap(() =>
        this.recipeService.get().pipe(
          map((data) => RecipesActions.loadRecipesSuccess({ recipes: data })),
          catchError((error) =>
            of(RecipesActions.loadRecipesFailure({ error })),
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
