import {FeedCardComponent} from './feed-card.component';
import {ImageService} from '../../services/image.service';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {FeedCardModule} from './feed-card.module';

describe('FeedCardComponent', () => {
    let component: FeedCardComponent;
    let fixture: MockedComponentFixture<FeedCardComponent>;

    beforeEach(async () => {
        return MockBuilder(FeedCardComponent, FeedCardModule)
            .mock(ImageService);
    });

    beforeEach(() => {
        fixture = MockRender(FeedCardComponent);
        component = fixture.point.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
