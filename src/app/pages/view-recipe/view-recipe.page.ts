import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeDto } from '../../shared/models/recipe.dto.model';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ViewRecipePopoverComponent } from '../../components/view-recipe-popover/view-recipe-popover.component';
import { mergeMap, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { selectRecipeDto } from 'src/app/core/recipes/recipes.selectors';
import {
  removeSelectedRecipe,
  setSelectedRecipe,
} from 'src/app/core/recipes/selected-recipe/selected-recipe.actions';
import { selectPortionsMultiplier } from 'src/app/core/recipes/selected-recipe/selected-recipe.selectors';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.page.html',
  styleUrls: ['./view-recipe.page.scss'],
})
export class ViewRecipePage implements OnInit, OnDestroy {
  recipe$: Observable<RecipeDto> = new Observable<RecipeDto>();

  multiplier$: Observable<number> = this.store.select(selectPortionsMultiplier);

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastService,
    private readonly popover: PopoverController,
  ) {}

  ngOnDestroy(): void {
    this.store.dispatch(removeSelectedRecipe());
  }

  ngOnInit(): void {
    this.recipe$ = this.route.paramMap.pipe(
      mergeMap((params) => {
        const id = params.get('id');
        return !!id
          ? this.store.pipe(
              select(selectRecipeDto, id),
              tap((recipe) =>
                this.store.dispatch(setSelectedRecipe({ recipe })),
              ),
            )
          : this.toastService
              .showMessage('An error occurred getting the recipe')
              .then(() => new RecipeDto(undefined));
      }),
    );
  }

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
