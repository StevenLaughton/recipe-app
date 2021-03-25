import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ComponentsModule } from './components/components.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffects } from './core/users/user.effects';
import { UserReducer } from './core/users/user.reducer';
import { RecipesEffects } from './core/recipes/recipes.effects';
import { RecipesReducer } from './core/recipes/recipes.reducer';
import { SaveRecipeEffects } from './core/recipes/save-recipe/save-recipe.effects';
import { DeleteRecipeEffects } from './core/recipes/delete-recipe/delete-recipe.effects';
import { SelectedRecipeReducer } from './core/recipes/selected-recipe/selected-recipe.reducer';
import { ImagesReducer } from './core/images/images.reducer';
import { ImagesEffects } from './core/images/images.effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately',
    }),
    StoreModule.forRoot({
      router: routerReducer,
      user: UserReducer,
      recipes: RecipesReducer,
      images: ImagesReducer,
      selectedRecipe: SelectedRecipeReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forFeature([
      UserEffects,
      RecipesEffects,
      SaveRecipeEffects,
      DeleteRecipeEffects,
      ImagesEffects,
    ]),
    EffectsModule.forRoot(),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
