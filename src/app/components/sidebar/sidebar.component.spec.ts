import { SidebarComponent } from './sidebar.component';
import { AuthService } from '../../services/auth.service';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { SidebarModule } from './sidebar.module';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: MockedComponentFixture<SidebarComponent>;

  beforeEach(() =>
    MockBuilder(SidebarComponent, SidebarModule).mock(Store, () =>
      provideMockStore(),
    ),
  );

  it('should create', () => {
    const fixture = MockRender(SidebarComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
