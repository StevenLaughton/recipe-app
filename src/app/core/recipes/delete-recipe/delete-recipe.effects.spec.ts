import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockBuilder, MockRender } from 'ng-mocks';
import { Observable } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';
import { ToastService } from 'src/app/services/toast.service';

import { DeleteRecipeEffects } from './delete-recipe.effects';

describe('DeleteRecipeEffects', () => {
  let actions$: Observable<any>;
  let effects: DeleteRecipeEffects;

  beforeEach(() =>
    MockBuilder(DeleteRecipeEffects)
      .mock(DeleteRecipeEffects, () => provideMockActions(() => actions$))
      .mock(ImageService)
      .mock(ToastService),
  );

  it('should be created', () => {
    const fixture = MockRender(DeleteRecipeEffects);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
