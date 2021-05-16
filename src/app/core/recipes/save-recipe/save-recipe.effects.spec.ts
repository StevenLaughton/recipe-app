import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SaveRecipeEffects } from './save-recipe.effects';
import { MockStore } from '@ngrx/store/testing';
import { MockBuilder, MockRender } from 'ng-mocks';
import { RecipeService } from 'src/app/services/recipe.service';
import { ToastService } from 'src/app/services/toast.service';

describe('SaveRecipeEffects', () => {
  let actions$: Observable<any>;
  let effects: SaveRecipeEffects;
  let store: MockStore;

  beforeEach(() =>
    MockBuilder(SaveRecipeEffects)
      .provide(provideMockActions(() => actions$))
      .mock(RecipeService)
      .mock(ToastService),
  );

  it('should be created', () => {
    const fixture = MockRender(SaveRecipeEffects);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
