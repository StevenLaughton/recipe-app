import {TestBed} from '@angular/core/testing';

import {CategoryService} from './category.service';
import {AngularFirestore} from '@angular/fire/firestore';

describe('CategoryService', () => {
    let service: CategoryService;
    let fireStoreSpy: AngularFirestore;

    beforeEach(() => {
        fireStoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc', 'createId']);

        TestBed.configureTestingModule({
            providers: [
                {provide: AngularFirestore, useValue: fireStoreSpy},
            ],
        });
        service = TestBed.inject(CategoryService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
