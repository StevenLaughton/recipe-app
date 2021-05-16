import { ProfileCardComponent } from './profile-card.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { ProfileCardModule } from './profile-card.module';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

describe('ProfileCardComponent', () => {
  let component: ProfileCardComponent;
  let fixture: MockedComponentFixture<ProfileCardComponent>;

  beforeEach(() =>
    MockBuilder(ProfileCardComponent, ProfileCardModule).mock(Store, () =>
      provideMockStore(),
    ),
  );

  it('should create', () => {
    const fixture = MockRender(ProfileCardComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
