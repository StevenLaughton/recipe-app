import {Component} from '@angular/core';
import {Recipe} from '../../shared/models/recipe.model';
import {FEED} from '../../shared/constants/routes.const';
import {RecipeService} from '../../core/services/recipe.service';
import {ImageService} from '../../core/services/image.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-add-recipe',
    templateUrl: './add-recipe.page.html',
    styleUrls: ['./add-recipe.page.scss'],
})
export class AddRecipePage {

    constructor(
        private readonly recipeService: RecipeService,
        private readonly imageService: ImageService,
        private readonly router: Router,
        public toastController: ToastController
    ) {
    }


    async saveRecipe(recipe: Recipe): Promise<void> {
        this.recipeService.addAsync(recipe).then(async id => {
            await this.imageService.add(id);

            const toast = await this.toastController.create({
                message: 'Recipe Saved',
                duration: 2000
            });

            await toast.present();

            await this.router.navigate([FEED]);
        });
    }

}
