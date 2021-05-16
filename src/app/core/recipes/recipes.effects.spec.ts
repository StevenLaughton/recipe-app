import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockBuilder, MockRender, MockReset } from 'ng-mocks';
import { Observable } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';

import { RecipesEffects } from './recipes.effects';

describe('RecipesEffects', () => {
  let actions$: Observable<any>;
  let effects: RecipesEffects;

  beforeEach(() =>
    MockBuilder(RecipesEffects)
      .mock(RecipesEffects, () => provideMockActions(() => actions$))
      .mock(RecipeService),
  );

  it('should be created', () => {
    const fixture = MockRender(RecipesEffects);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
