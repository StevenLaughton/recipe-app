import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockBuilder, MockRender } from 'ng-mocks';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

import { UserEffects } from './user.effects';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;

  beforeEach(() =>
    MockBuilder(UserEffects)
      .mock(UserEffects, () => provideMockActions(() => actions$))
      .mock(AuthService)
      .mock(ToastService)
      .mock(Router),
  );

  it('should be created', () => {
    const fixture = MockRender(UserEffects);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
