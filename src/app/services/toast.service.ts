import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FEED } from '../shared/constants/routes.const';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private readonly router: Router,
    private readonly toastController: ToastController,
  ) {}

  public async showMessageAndReturnToFeed(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    await toast.present();
    await this.router.navigate([FEED]);
  }

  public async showMessage(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    await toast.present();
  }
}
