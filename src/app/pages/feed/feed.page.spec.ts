import { FeedPage } from './feed.page';
import { MockBuilder, MockRender } from 'ng-mocks';
import { FeedPageModule } from './feed.module';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

describe('FeedPage', () => {
  beforeEach(() =>
    MockBuilder(FeedPage, FeedPageModule)
      .mock(Store, () => provideMockStore())
      .mock(ActionSheetController)
      .mock(Router),
  );

  it('should create', () => {
    const fixture = MockRender(FeedPage);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
