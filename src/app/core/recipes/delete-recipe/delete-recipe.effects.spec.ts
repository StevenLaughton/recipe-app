import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DeleteRecipeEffects } from './delete-recipe.effects';

describe('DeleteRecipeEffects', () => {
  let actions$: Observable<any>;
  let effects: DeleteRecipeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeleteRecipeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DeleteRecipeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
