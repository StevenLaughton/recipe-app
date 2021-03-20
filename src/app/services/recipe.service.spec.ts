import {TestBed} from '@angular/core/testing';

import {RecipeService} from './recipe.service';
import {AngularFirestore} from '@angular/fire/firestore';

describe('RecipeService', () => {
  let service: RecipeService;
  let fireStoreSpy: AngularFirestore;

  beforeEach(() => {
    fireStoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc', 'createId']);

    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFirestore, useValue: fireStoreSpy},
      ],
    });
    service = TestBed.inject(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
