import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UserActions from './user.actions';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      concatMap(() =>
        this.authService.loadUser().pipe(
          map((data) => UserActions.loadUsersSuccess({ data: new User(data) })),
          catchError((error) => of(UserActions.loadUsersFailure({ error }))),
        ),
      ),
    );
  });

  constructor(private actions$: Actions, private authService: AuthService) {}
}
