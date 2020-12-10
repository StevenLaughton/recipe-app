import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RecipeDto} from '../../shared/models/recipe.dto.model';
import {FEED} from '../../shared/constants/routes.const';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../core/services/recipe.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {ViewRecipePopoverComponent} from '../../components/view-recipe-popover/view-recipe-popover.component';

@Component({
    selector: 'app-view-recipe',
    templateUrl: './view-recipe.page.html',
    styleUrls: ['./view-recipe.page.scss'],
})
export class ViewRecipePage implements OnInit {
    recipe$: Observable<RecipeDto | undefined> = new Observable<RecipeDto>();
    multiplier = 1;

    constructor(
        private readonly recipeService: RecipeService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly toastController: ToastController,
        private readonly popover: PopoverController
    ) {
    }

    async ngOnInit(): Promise<void> {
        this.route.paramMap.subscribe(async (params) => {
            const id = params.get('id');
            if (id) {
                this.recipe$ = this.recipeService.getDto(id);
            } else {
                const toast = await this.toastController.create({
                    message: 'An error occurred getting the recipe',
                    duration: 2000
                });
                await toast.present();
                await this.router.navigate([FEED]);
            }
        });
    }

    async presentPopover(ev: Event, recipe: RecipeDto) {
        const popover = await this.popover.create({
            component: ViewRecipePopoverComponent,
            cssClass: 'popover-content',
            event: ev,
            componentProps: {
                recipe,
                multiplier: this.multiplier
            },
        });

        popover.onDidDismiss().then(data => {
            if (data.role === 'multiplier') {
                this.multiplier = data.data;
            }
        });

        return await popover.present();
    }
}
