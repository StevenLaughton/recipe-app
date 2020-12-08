import {ImageService} from './image.service';
import {MockService} from 'ng-mocks';

describe('ImageService', () => {
    let service: ImageService;

    beforeEach(() => {
        // MockBuilder(ImageService)
        //     .mock(AngularFireStorage);

        // service = TestBed.inject(ImageService);
        service = MockService(ImageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
