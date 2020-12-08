import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeFormComponent} from './recipe-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [RecipeFormComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule
    ],
    exports: [RecipeFormComponent]

})
export class RecipeFormModule {
}
