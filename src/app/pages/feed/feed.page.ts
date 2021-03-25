import { Component } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  recipesLoaded,
  selectRecipesWithCategory,
} from 'src/app/core/recipes/recipes.selectors';
import { AppRoutes } from 'src/app/shared/constants/routes.const';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {
  recipes$: Observable<Array<Recipe>> = this.store.select(
    selectRecipesWithCategory,
  );
  loaded$: Observable<boolean> = this.store.select(recipesLoaded);
  loaderCount = Array(10);

  constructor(
    private readonly store: Store,
    private readonly actionSheetController: ActionSheetController,
    private readonly router: Router,
  ) {}

  trackByFunction(index: number, recipe: Recipe): string {
    return recipe.id;
  }

  async addRecipe(): Promise<void> {
    await this.router.navigate([AppRoutes.Add]);
  }

  async goToRecipe(recipe: Recipe): Promise<void> {
    await this.router.navigate([`${AppRoutes.View}/`, recipe.id]);
  }

  async presentMenu(): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Add Recipe',
          handler: () => {
            this.addRecipe();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }
}
