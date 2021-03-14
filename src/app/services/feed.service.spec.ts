import {TestBed} from '@angular/core/testing';

import {FeedService} from './feed.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFirestore} from '@angular/fire/firestore';

describe('FeedService', () => {
    let service: FeedService;
    let fireStoreSpy: AngularFirestore;

    beforeEach(() => {
        fireStoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc', 'createId']);

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                {provide: AngularFirestore, useValue: fireStoreSpy},
            ],
        });
        service = TestBed.inject(FeedService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
