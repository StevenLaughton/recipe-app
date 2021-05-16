import { ViewRecipePage } from './view-recipe.page';
import { MockBuilder, MockRender } from 'ng-mocks';
import { ViewRecipePageModule } from './view-recipe.module';
import { PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('ViewRecipePage', () => {
  beforeEach(() =>
    MockBuilder(ViewRecipePage, ViewRecipePageModule)
      .mock(PopoverController)
      .provide(
        provideMockStore({
          initialState: {},
        }),
      ),
  );

  it('should create', () => {
    const fixture = MockRender(ViewRecipePage);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
