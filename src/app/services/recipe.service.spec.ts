import { TestBed } from '@angular/core/testing';

import { RecipeService } from './recipe.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MockBuilder, MockRender } from 'ng-mocks';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('RecipeService', () => {
  beforeEach(() =>
    MockBuilder(RecipeService)
      .mock(AngularFirestore)
      .provide(provideMockStore()),
  );

  it('should be created', () => {
    const fixture = MockRender(RecipeService);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
