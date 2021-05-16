import { FeedCardComponent } from './feed-card.component';
import { ImageService } from '../../services/image.service';
import { MockBuilder, MockRender } from 'ng-mocks';
import { FeedCardModule } from './feed-card.module';
import { of } from 'rxjs';
import { RecipeModelMock } from 'src/app/core/mock/recipe.model.mock';

describe('FeedCardComponent', () => {
  beforeEach(() =>
    MockBuilder(FeedCardComponent, FeedCardModule).mock(ImageService, {
      hasImage: () => of(true),
    }),
  );

  it('should create', () => {
    const fixture = MockRender(FeedCardComponent, {
      recipe: RecipeModelMock.createOne(),
    });

    expect(fixture.point.componentInstance).toBeDefined();
  });
});
