import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockBuilder, MockRender } from 'ng-mocks';
import { Observable } from 'rxjs';

import { ImagesEffects } from './images.effects';

describe('ImagesEffects', () => {
  let actions$: Observable<any>;
  let effects: ImagesEffects;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     providers: [ImagesEffects, provideMockActions(() => actions$)],
  //   });

  //   effects = TestBed.inject(ImagesEffects);
  // });

  beforeEach(() =>
    MockBuilder(ImagesEffects).mock(ImagesEffects, () =>
      provideMockActions(() => actions$),
    ),
  );

  it('should be created', () => {
    const fixture = MockRender(ImagesEffects);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
