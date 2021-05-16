import { LoginPage } from './login.page';
import { MockBuilder, MockRender } from 'ng-mocks';
import { LoginPageModule } from './login.module';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

describe('LoginPage', () => {
  const initialState = {
    user: {
      id: '1',
      displayName: 'Test User',
      email: 'TestUser@email.com',
      photoUrl: 'photo:url',
    },
    isLoggedIn: false,
  };

  beforeEach(() =>
    MockBuilder(LoginPage, LoginPageModule)
      .provide(provideMockStore({ initialState }))
      .mock(Router),
  );

  it('should create', () => {
    const fixture = MockRender(LoginPage);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
