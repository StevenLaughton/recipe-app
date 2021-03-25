import { Component, Input, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as DeleteRecipeActions from 'src/app/core/recipes/delete-recipe/delete-recipe.actions';
import { take, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { setDisplayedPortions } from 'src/app/core/recipes/selected-recipe/selected-recipe.actions';
import { selectDisplayedPortions } from 'src/app/core/recipes/selected-recipe/selected-recipe.selectors';
import { AppRoutes } from 'src/app/shared/constants/routes.const';

@Component({
  selector: 'app-view-recipe-popover',
  templateUrl: './view-recipe-popover.component.html',
  styleUrls: ['./view-recipe-popover.component.scss'],
})
export class ViewRecipePopoverComponent implements OnInit {
  @Input()
  recipeId: string = '';

  portions = Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

  portionsControl: FormControl = new FormControl(1);

  constructor(
    private readonly router: Router,
    private readonly alertController: AlertController,
    private readonly popover: PopoverController,
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(
        take(1),
        select(selectDisplayedPortions),
        tap((portions) => this.portionsControl.setValue(portions)),
      )
      .subscribe();

    this.portionsControl.valueChanges
      .pipe(
        take(1),
        tap((portions) =>
          this.store.dispatch(setDisplayedPortions({ value: portions })),
        ),
        tap(() => this.popover.dismiss()),
      )
      .subscribe();
  }

  async navigateToEdit(recipeId: string): Promise<void> {
    await this.popover.dismiss();
    await this.router.navigate([AppRoutes.Edit, recipeId]);
  }

  async presentDeleteAlert(recipeId: string) {
    await this.popover.dismiss();
    const alert = await this.alertController.create({
      header: 'Are you sure!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Okay',
          handler: () => {
            this.store.dispatch(
              DeleteRecipeActions.begin({ recipeId: recipeId }),
            );
          },
        },
      ],
    });

    await alert.present();
  }
}
