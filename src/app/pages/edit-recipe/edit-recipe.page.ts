import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Recipe} from '../../shared/models/recipe.model';
import {RecipeService} from '../../core/services/recipe.service';
import {ImageService} from '../../core/services/image.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {FEED} from '../../shared/constants/routes.const';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-edit-recipe',
    templateUrl: './edit-recipe.page.html',
    styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {
    recipe$: Observable<Recipe | undefined> | undefined;

    constructor(private readonly recipeService: RecipeService,
                private readonly imageService: ImageService,
                private readonly router: Router,
                private readonly route: ActivatedRoute,
                private readonly toastController: ToastController) {
    }

    ngOnInit() {
        this.route.paramMap
            .pipe(take(1))
            .subscribe((params) => {
                const id = params.get('id');
                if (id) {
                    this.recipe$ = this.recipeService.get(id);
                }
            });
    }

    async saveRecipe(recipe: Recipe): Promise<void> {
        this.recipeService.updateAsync(recipe).then(async id => {
            await this.imageService.add(id);

            const toast = await this.toastController.create({
                message: 'Recipe Updated',
                duration: 2000
            });

            await toast.present();

            await this.router.navigate([FEED]);
        });
    }
}
