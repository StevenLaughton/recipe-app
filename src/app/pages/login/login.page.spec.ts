import {LoginPage} from './login.page';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {AuthService} from '../../core/services/auth.service';
import {FirebaseUIModule} from 'firebaseui-angular';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginPageModule} from './login.module';

describe('LoginPage', () => {
    let component: LoginPage;
    let fixture: MockedComponentFixture<LoginPage>;

    beforeEach(() => {
        return MockBuilder(LoginPage, LoginPageModule)
            .mock(AuthService)
            .mock(FirebaseUIModule)
            .keep(RouterTestingModule);
    });

    beforeEach(() => {
        fixture = MockRender(LoginPage);
        component = fixture.point.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
