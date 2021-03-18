import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LOGIN } from 'src/app/shared/constants/routes.const';
import {Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase';
import User = firebase.User;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public toastController: ToastController,
  ) {}

  loadUser(): Observable<User | null> {
    return this.afAuth.authState;
  }

  isLoggedIn(): Observable<boolean> {
    return this.loadUser().pipe(
      take(1),
      map((user: User | null) => !!user),
    );
  }

  // Sign out
  async SignOut(): Promise<void> {
    await this.afAuth.signOut();
    await this.router.navigate([LOGIN]);
    const toast = await this.toastController.create({
      message: 'Logged Out',
      duration: 2000,
    });
    await toast.present();
  }
}
