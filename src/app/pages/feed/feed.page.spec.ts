import {ActionSheetController, IonRouterOutlet} from '@ionic/angular';

import {FeedPage} from './feed.page';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {FeedService} from '../../core/services/feed.service';
import {Router} from '@angular/router';
import {CategoryService} from '../../core/services/category.service';
import {FeedPageModule} from './feed.module';

describe('FeedPage', () => {
    let component: FeedPage;
    let fixture: MockedComponentFixture<FeedPage>;

    beforeEach(() => {
        return MockBuilder(FeedPage, FeedPageModule)
            .mock(FeedService)
            .mock(Router)
            .mock(IonRouterOutlet)
            .mock(CategoryService)
            .mock(ActionSheetController);
    });

    beforeEach(() => {
        fixture = MockRender(FeedPage);
        component = fixture.point.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
