import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {LOGIN} from 'src/app/shared/constants/routes.const';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';
import {ToastController} from '@ionic/angular';
import firebase from 'firebase';
import User = firebase.User;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private user: BehaviorSubject<Observable<User | null>> = new BehaviorSubject<Observable<User | null>>(of(null));


    constructor(
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,
        public toastController: ToastController
    ) {
        this.user.next(this.afAuth.authState);
    }

    getUser(): Observable<User | null> {
        return this.user
            .asObservable()
            .pipe(switchMap((user: Observable<User | null>) => user));
    }

    isLoggedIn(): Observable<boolean> {
        return this.getUser().pipe(
            take(1),
            map((user: User | null) => {
                return !!user;
            })
        );
    }

    // Sign out
    async SignOut(): Promise<void> {
        await this.afAuth.signOut();
        await this.router.navigate([LOGIN]);
        const toast = await this.toastController.create({
            message: 'Logged Out',
            duration: 2000
        });
        await toast.present();
    }
}
