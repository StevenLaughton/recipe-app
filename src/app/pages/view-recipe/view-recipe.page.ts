import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RecipeDto} from '../../shared/models/recipe.dto.model';
import {EDIT, FEED} from '../../shared/constants/routes.const';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../core/services/recipe.service';
import {ActionSheetController, AlertController, ToastController} from '@ionic/angular';
import {ImageService} from '../../core/services/image.service';

@Component({
    selector: 'app-view-recipe',
    templateUrl: './view-recipe.page.html',
    styleUrls: ['./view-recipe.page.scss'],
})
export class ViewRecipePage implements OnInit {
    recipe$: Observable<RecipeDto | undefined> = new Observable<RecipeDto>();

    constructor(
        private readonly recipeService: RecipeService,
        private readonly imageService: ImageService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly toastController: ToastController,
        private readonly actionSheetController: ActionSheetController,
        private readonly alertController: AlertController
    ) {
    }

    async ngOnInit(): Promise<void> {
        this.route.paramMap.subscribe(async (params) => {
            const id = params.get('id');
            if (id) {
                this.recipe$ = this.recipeService.getDto(id);
            } else {
                await this.presentToast('An error occurred getting the recipe');
                await this.router.navigate([FEED]);
            }
        });
    }

    private async navigateToEdit(recipeId: string): Promise<void> {
        await this.router.navigate([EDIT, recipeId]);
    }

    private deleteRecipe(recipe: RecipeDto): void {
        this.recipeService.delete(recipe.id).then(async _ => {
            await this.imageService.delete(recipe.id);
            await this.presentToast(`Deleted ${recipe.name}`);
            await this.router.navigate([FEED]);
        });
    }

    async presentDeleteAlert(recipe: RecipeDto) {
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

    async presentMenu(recipe: RecipeDto): Promise<void> {
        const actionSheet = await this.actionSheetController.create({
            buttons: [{
                text: 'Edit',
                handler: () => {
                    this.navigateToEdit(recipe.id);
                }
            }, {
                text: 'Delete',
                handler: () => {
                    this.presentDeleteAlert(recipe);
                }
            }, {
                text: 'Cancel',
                role: 'cancel',
            }]
        });
        await actionSheet.present();
    }

    async presentToast(content: string): Promise<void> {
        const toast = await this.toastController.create({
            message: content,
            duration: 2000
        });
        await toast.present();
    }

}
