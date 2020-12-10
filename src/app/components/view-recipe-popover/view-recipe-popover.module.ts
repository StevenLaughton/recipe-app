import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewRecipePopoverComponent} from './view-recipe-popover.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [ViewRecipePopoverComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
    exports: [
        ViewRecipePopoverComponent
    ]
})
export class ViewRecipePopoverModule {
}
