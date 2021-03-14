import {SidebarComponent} from './sidebar.component';
import {AuthService} from '../../services/auth.service';
import {CategoryService} from '../../services/category.service';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {SidebarModule} from './sidebar.module';

describe('SidebarComponent', () => {
    let component: SidebarComponent;
    let fixture: MockedComponentFixture<SidebarComponent>;

    beforeEach(async () =>
        MockBuilder(SidebarComponent, SidebarModule)
            .mock(AuthService)
            .mock(CategoryService)
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


