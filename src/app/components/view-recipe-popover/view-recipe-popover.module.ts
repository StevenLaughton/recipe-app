import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewRecipePopoverComponent} from './view-recipe-popover.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [ViewRecipePopoverComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        ViewRecipePopoverComponent
    ]
})
export class ViewRecipePopoverModule {
}
