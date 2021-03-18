import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from '../../shared/models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FEED } from '../../shared/constants/routes.const';
import { mergeMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { selectRecipe } from 'src/app/core/recipes/recipes.selectors';
import { saveRecipe } from 'src/app/core/recipes/save-recipe/save-recipe.actions';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {
  recipe$: Observable<Recipe | undefined> = of(undefined);

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toastController: ToastController,
  ) {}

  ngOnInit() {
    this.recipe$ = this.route.paramMap.pipe(
      mergeMap((params) => {
        const id = params.get('id');
        return !!id
          ? this.store.pipe(select(selectRecipe, id))
          : this.showError().then(() => undefined);
      }),
    );
  }

  saveRecipe(recipe: Recipe): void {
    this.store.dispatch(saveRecipe({ recipe: recipe, editing: true }));
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
