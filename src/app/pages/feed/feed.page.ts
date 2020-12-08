import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Recipe} from '../../shared/models/recipe.model';
import {FeedService} from '../../core/services/feed.service';
import {Router} from '@angular/router';
import {CategoryService} from '../../core/services/category.service';
import {ActionSheetController} from '@ionic/angular';
import {ADD, VIEW} from '../../shared/constants/routes.const';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.page.html',
    styleUrls: ['./feed.page.scss'],
})
export class FeedPage {
    recipes$: Observable<Recipe[]> | undefined = undefined;
    loaderCount = Array(10);

    constructor(
        private readonly actionSheetController: ActionSheetController,
        private readonly categoryService: CategoryService,
        private readonly feedService: FeedService,
        private readonly router: Router,
    ) {
        this.categoryService.getFilter()
            .subscribe(category => {
                this.recipes$ = this.feedService.get(category);
            });
    }

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
            buttons: [{
                text: 'Add Recipe',
                handler: () => {
                    this.addRecipe();
                }
            }, {
                text: 'Cancel',
                role: 'cancel',
            }]
        });
        await actionSheet.present();
    }
}
