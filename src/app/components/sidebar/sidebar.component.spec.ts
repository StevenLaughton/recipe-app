import { SidebarComponent } from './sidebar.component';
import { AuthService } from '../../services/auth.service';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { SidebarModule } from './sidebar.module';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: MockedComponentFixture<SidebarComponent>;

  beforeEach(async () =>
    MockBuilder(SidebarComponent, SidebarModule).mock(AuthService),
  );

  beforeEach(() => {
    fixture = MockRender(SidebarComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
