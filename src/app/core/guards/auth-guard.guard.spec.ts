import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {AuthService} from '../../services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {MockProvider} from 'ng-mocks';

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let authServiceSpy: AuthService;

    beforeEach(() => {
        authServiceSpy = jasmine.createSpyObj('AngularFirestore', ['user$.pipe', 'isLoggedIn', 'SignOut']);

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                MockProvider(AuthService),
            ],
        });
        guard = TestBed.inject(AuthGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
