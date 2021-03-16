import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CategoryService } from '../../services/category.service';
import * as CategoryActions from './category.actions';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
  ) {}

  loadCategories$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.BeginGetCategoriesAction),
      switchMap(() =>
        this.categoryService.getCategories().pipe(
          map((categories: Array<string>) =>
            CategoryActions.SuccessGetCategoriesAction({ payload: categories }),
          ),
          catchError((error: Error) =>
            of(CategoryActions.ErrorGetCategoriesAction(error)),
          ),
        ),
      ),
    ),
  );
}
