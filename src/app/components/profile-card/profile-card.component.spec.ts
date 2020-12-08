import {ProfileCardComponent} from './profile-card.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {ProfileCardModule} from './profile-card.module';

describe('ProfileCardComponent', () => {
    let component: ProfileCardComponent;
    let fixture: MockedComponentFixture<ProfileCardComponent>;

    beforeEach(async () => {
        return MockBuilder(ProfileCardComponent, ProfileCardModule);
    });

    beforeEach(() => {
        fixture = MockRender(ProfileCardComponent);
        component = fixture.point.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
