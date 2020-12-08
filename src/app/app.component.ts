import {Component, OnInit} from '@angular/core';

import {AlertController, Platform, ToastController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SwUpdate} from '@angular/service-worker';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private swUpdate: SwUpdate,
        public toastController: ToastController,
        public alertController: AlertController
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    async ngOnInit() {
        await this.checkAndUpdateServiceWorker();
    }

    async checkAndUpdateServiceWorker(): Promise<void> {
        if (this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe(() => {
                this.presentUpdateAlert();
            });
        }
    }

    async presentToast(content: string): Promise<void> {
        const toast = await this.toastController.create({
            message: content,
            duration: 2000
        });
        await toast.present();
    }

    async presentUpdateAlert() {
        const alert = await this.alertController.create({
            header: 'Update',
            message: `New version available. Load New Version?`,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Okay',
                    handler: () => {
                        window.location.reload();
                        this.presentToast('Updated');
                    }
                }
            ]
        });

        await alert.present();
    }
}
