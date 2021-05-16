import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MockBuilder, MockRender } from 'ng-mocks';

import { UploadImageComponent } from './upload-image.component';
import { UploadImageModule } from './upload-image.module';

describe('UploadImageComponent', () => {
  beforeEach(() =>
    MockBuilder(UploadImageComponent, UploadImageModule).mock(Store, () =>
      provideMockStore(),
    ),
  );

  it('should create', () => {
    const component = MockRender(UploadImageComponent);
    expect(component.point.componentInstance).toBeDefined();
  });
});
