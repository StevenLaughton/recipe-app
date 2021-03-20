import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SwUpdate } from '@angular/service-worker';
import { Meta, Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { loadUsers } from './core/users/user.actions';
import { loadRecipes } from './core/recipes/recipes.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Recipes App';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swUpdate: SwUpdate,
    private titleService: Title,
    private metaService: Meta,
    public alertController: AlertController,
    private readonly store: Store,
  ) {
    this.initializeApp();
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadRecipes());
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async ngOnInit() {
    this.addMetaTags();
    await this.checkAndUpdateServiceWorker();
  }

  async checkAndUpdateServiceWorker(): Promise<void> {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.presentUpdateAlert();
      });
    }
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
        },
        {
          text: 'Okay',
          handler: () => {
            window.location.reload();
          },
        },
      ],
    });

    await alert.present();
  }

  private addMetaTags() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      { name: 'keywords', content: 'Recipe' },
      { name: 'description', content: 'Recipe App' },
    ]);
  }
}
