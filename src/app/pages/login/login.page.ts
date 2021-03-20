import { Component, OnDestroy, OnInit } from '@angular/core';
import { FEED } from '../../shared/constants/routes.const';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { select, Store } from '@ngrx/store';
import { isLoggedIn } from 'src/app/core/users/user.selectors';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  constructor(private readonly store: Store, private readonly router: Router) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.store
      .pipe(
        select(isLoggedIn),
        untilDestroyed(this),
        tap((loggedIn: boolean) => {
          if (loggedIn) {
            this.router.navigate([FEED]);
          }
        }),
      )
      .subscribe();
  }

  async successCallback(): Promise<void> {
    await this.router.navigate([FEED]);
  }
}
