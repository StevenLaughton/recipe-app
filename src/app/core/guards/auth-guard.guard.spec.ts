import { AuthGuard } from './auth.guard';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { Router, RouterOutlet } from '@angular/router';
import { LoginPage } from 'src/app/pages/login/login.page';
import { isLoggedIn } from '../users/user.selectors';

describe('AuthGuard', () => {
  beforeEach(() =>
    MockBuilder(AuthGuard)
      .provide(
        provideMockStore({
          selectors: [{ selector: isLoggedIn, value: false }],
        }),
      )
      .keep(RouterTestingModule.withRoutes([])),
  );

  it('should be created', () => {
    const guard = MockRender(AuthGuard);
    expect(guard.point.componentInstance).toBeDefined();
  });

  it('should redirect to login', fakeAsync(() => {
    const fixture = MockRender(RouterOutlet);
    const router: Router = fixture.point.injector.get(Router);
    //const location: Location = fixture.point.injector.get(Location);

    if (fixture.ngZone) {
      fixture.ngZone.run(() => router.initialNavigation());
      tick();
    }

    expect(location.pathname).toEqual('/login');
    expect(() => ngMocks.find(LoginPage)).not.toThrow();
  }));
});
