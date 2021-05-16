import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { MockBuilder, MockRender } from 'ng-mocks';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(ToastService);
  // });

  beforeEach(() =>
    MockBuilder(ToastService).mock(ToastController).mock(Router),
  );

  it('should be created', () => {
    const fixture = MockRender(ToastService);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
