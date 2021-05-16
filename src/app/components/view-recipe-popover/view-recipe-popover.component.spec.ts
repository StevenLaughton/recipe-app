import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { getMockStore, MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockBuilder, MockRender } from 'ng-mocks';
import { of } from 'rxjs';
import { selectDisplayedPortions } from 'src/app/core/recipes/selected-recipe/selected-recipe.selectors';
import { RecipeDto } from 'src/app/shared/models/recipe.dto.model';
import { ViewRecipePopoverComponent } from './view-recipe-popover.component';
import { ViewRecipePopoverModule } from './view-recipe-popover.module';

//  beforeEach(() => {
//  *     TestBed.configureTestingModule({
//  *       providers: [
//  *         provideMockStore({
//  *           initialState: { books: { entities: [] } },
//  *           selectors: [
//  *             { selector: selectAllBooks, value: ['Book 1', 'Book 2'] },
//  *             { selector: selectVisibleBooks, value: ['Book 1'] },
//  *           ],
//  *         }),
//  *       ],
//  *     });

describe('ViewRecipePopoverComponent', () => {
  beforeEach(() =>
    MockBuilder(ViewRecipePopoverComponent, ViewRecipePopoverModule)
      .provide(
        provideMockStore({
          initialState: {
            recipe: new RecipeDto(undefined),
            selectedPortions: 1,
          },
          selectors: [{ selector: selectDisplayedPortions, value: of(1) }],
        }),
      )
      .mock(AlertController)
      .mock(PopoverController)
      .mock(Router),
  );

  it('should create', () => {
    const fixture = MockRender(ViewRecipePopoverComponent);

    expect(fixture.point.componentInstance).toBeDefined();
  });
});
