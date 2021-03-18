import { Component } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ADD, VIEW } from '../../shared/constants/routes.const';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  recipesLoaded,
  selectRecipesWithCategory,
} from 'src/app/core/recipes/recipes.selectors';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {
  recipes$: Observable<Array<Recipe>> = this.store.pipe(
    select(selectRecipesWithCategory),
  );
  loaded$: Observable<boolean> = this.store.pipe(select(recipesLoaded));
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
    await this.router.navigate([ADD]);
  }

  async goToRecipe(recipe: Recipe): Promise<void> {
    await this.router.navigate([`${VIEW}/`, recipe.id]);
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
