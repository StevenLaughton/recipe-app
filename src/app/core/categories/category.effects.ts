import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CategoryService } from '../services/category.service';
import { CategoryActions } from './category.actions';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
  ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.LoadDataBegin),
      mergeMap(() =>
        this.categoryService.getCategories().pipe(
          map((categories: string[]) => ({
            type: CategoryActions.LoadDataSuccess,
            payload: categories,
          })),
          catchError((error: string) =>
            of({
              type: CategoryActions.LoadDataFailure,
              payload: error,
            }),
          ),
        ),
      ),
    ),
  );
}
