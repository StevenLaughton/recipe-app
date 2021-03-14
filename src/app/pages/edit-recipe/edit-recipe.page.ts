import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { ImageService } from '../../services/image.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FEED } from '../../shared/constants/routes.const';
import { mergeMap, tap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit, OnDestroy {
  recipe$: Observable<Recipe | undefined> | undefined;

  constructor(
    private readonly recipeService: RecipeService,
    private readonly imageService: ImageService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toastController: ToastController,
  ) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.recipe$ = this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => {
        const id = params.get('id');
        if (id) {
          return this.recipeService.get(id);
        }
        return this.showError().then(() => undefined);
      }),
    );
  }

  async saveRecipe(recipe: Recipe): Promise<void> {
    this.recipeService.updateAsync(recipe).then(async (id) => {
      (await this.imageService.add(id))
        .pipe(
          untilDestroyed(this),
          tap(async (completed: boolean) => {
            if (completed === true) {
              await this.showPopupAndNavigate();
            }
          }),
        )
        .subscribe();
    });
  }

  async showPopupAndNavigate(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Recipe Updated',
      duration: 2000,
    });

    await toast.present();

    await this.router.navigate([FEED]);
  }

  private async showError(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'An error occurred getting the recipe',
      duration: 2000,
    });
    await toast.present();
    await this.router.navigate([FEED]);
  }
}
