import { Component, OnDestroy, OnInit } from '@angular/core';
import { FEED } from '../../shared/constants/routes.const';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.authService
      .isLoggedIn()
      .pipe(untilDestroyed(this))
      .subscribe(async (loggedIn: boolean) => {
        if (loggedIn) {
          await this.router.navigate([FEED]);
        }
      });
  }

  async successCallback(): Promise<void> {
    await this.router.navigate([FEED]);
  }
}
