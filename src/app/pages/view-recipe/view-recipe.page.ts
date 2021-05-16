import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { ViewRecipePopoverComponent } from '../../components/view-recipe-popover/view-recipe-popover.component';
import { finalize, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectRecipeDto } from 'src/app/core/recipes/recipes.selectors';
import {
  removeSelectedRecipe,
  setSelectedRecipe,
} from 'src/app/core/recipes/selected-recipe/selected-recipe.actions';
import { selectPortionsMultiplier } from 'src/app/core/recipes/selected-recipe/selected-recipe.selectors';
import { RecipeDto } from 'src/app/core/models/recipe.dto.model';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.page.html',
  styleUrls: ['./view-recipe.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewRecipePage {
  recipe$: Observable<RecipeDto> = this.store.select(selectRecipeDto).pipe(
    tap((recipe) => this.store.dispatch(setSelectedRecipe({ recipe }))),
    finalize(() => this.store.dispatch(removeSelectedRecipe())),
  );

  multiplier$: Observable<number> = this.store.select(selectPortionsMultiplier);

  constructor(
    private readonly store: Store,
    private readonly popover: PopoverController,
  ) {}

  async presentPopover(ev: Event, recipe: RecipeDto) {
    const popover = await this.popover.create({
      component: ViewRecipePopoverComponent,
      cssClass: 'popover-content',
      event: ev,
      componentProps: {
        recipeId: recipe.id,
      },
    });

    return await popover.present();
  }
}
