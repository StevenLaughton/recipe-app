import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SaveRecipeEffects } from './save-recipe.effects';

describe('SaveRecipeEffects', () => {
  let actions$: Observable<any>;
  let effects: SaveRecipeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SaveRecipeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SaveRecipeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
