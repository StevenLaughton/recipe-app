import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase';
import User = firebase.User;
import { AppRoutes } from '../core/constants/routes.const';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public toastController: ToastController,
  ) {}

  getUser(): Observable<User | null> {
    return this.afAuth.authState;
  }

  // Sign out
  async SignOut(): Promise<void> {
    await this.afAuth.signOut();
    await this.router.navigate([AppRoutes.Login]);

    const toast = await this.toastController.create({
      message: 'Logged Out',
      duration: 2000,
    });
    await toast.present();
  }

  signOut(): Observable<void> {
    return from(this.afAuth.signOut());
  }
}
