import {Component, Input, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, PopoverController, ToastController} from '@ionic/angular';
import {EDIT, FEED} from '../../shared/constants/routes.const';
import {RecipeDto} from '../../shared/models/recipe.dto.model';
import {Router} from '@angular/router';
import {RecipeService} from '../../services/recipe.service';
import {ImageService} from '../../services/image.service';

@Component({
    selector: 'app-view-recipe-popover',
    templateUrl: './view-recipe-popover.component.html',
    styleUrls: ['./view-recipe-popover.component.scss'],
})
export class ViewRecipePopoverComponent implements OnInit {
    @Input()
    recipe!: RecipeDto;

    @Input()
    inputPortions!: number;

    selectedPortions: number | null = null;
    portions = Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    constructor(
        private readonly recipeService: RecipeService,
        private readonly imageService: ImageService,
        private readonly router: Router,
        private readonly actionSheetController: ActionSheetController,
        private readonly alertController: AlertController,
        private readonly toastController: ToastController,
        private readonly popover: PopoverController,
    ) {

    }


    ngOnInit(): void {
        this.selectedPortions = this.inputPortions;
    }

    async closePopover() {
        await this.popover.dismiss();
    }

    async navigateToEdit(recipeId: string): Promise<void> {
        await this.closePopover();
        await this.router.navigate([EDIT, recipeId]);
    }

    private deleteRecipe(recipe: RecipeDto): void {
        this.recipeService.delete(recipe.id).then(async _ => {
            await this.imageService.delete(recipe.id);
            const toast = await this.toastController.create({
                message: `Deleted ${recipe.name}`,
                duration: 2000
            });
            await toast.present();
            await this.router.navigate([FEED]);
        });
    }

    async presentDeleteAlert(recipe: RecipeDto) {
        await this.closePopover();
        const alert = await this.alertController.create({
            header: 'Are you sure!',
            message: `Are you sure you want to delete ${recipe.name}`,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Okay',
                    handler: () => {
                        this.deleteRecipe(recipe);
                    }
                }
            ]
        });

        await alert.present();
    }

    async calculateMultiplier(): Promise<void> {
        await this.popover.dismiss(this.selectedPortions, 'portions');
    }

}
