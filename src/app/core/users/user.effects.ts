import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UserActions from './user.actions';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { LOGIN } from 'src/app/shared/constants/routes.const';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      concatMap(() =>
        this.authService.getUser().pipe(
          map((user) =>
            UserActions.loadUsersSuccess({
              user: new User(user),
              isLoggedIn: !!user,
            }),
          ),
          catchError((error) => of(UserActions.loadUsersFailure({ error }))),
        ),
      ),
    );
  });

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.signOut),
      concatMap(() =>
        this.authService.signOut().pipe(
          map(() => {
            this.successMessage();
            return UserActions.signOutSuccess();
          }),
          catchError((error) => of(UserActions.signOutFailure({ error }))),
        ),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly router: Router,
  ) {}

  async successMessage(): Promise<void> {
    await this.router.navigate([LOGIN]);
    this.toastService.showMessage('Logged Out');
  }
}
