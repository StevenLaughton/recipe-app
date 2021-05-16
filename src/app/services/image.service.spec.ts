import { ImageService } from './image.service';
import { MockBuilder, MockRender, MockService } from 'ng-mocks';
import { AngularFireStorage } from '@angular/fire/storage';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(() => MockBuilder(ImageService).mock(AngularFireStorage));

  it('should be created', () => {
    const fixture = MockRender(ImageService);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
