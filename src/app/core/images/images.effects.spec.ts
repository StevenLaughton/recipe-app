import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ImagesEffects } from './images.effects';

describe('ImagesEffects', () => {
  let actions$: Observable<any>;
  let effects: ImagesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImagesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ImagesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
