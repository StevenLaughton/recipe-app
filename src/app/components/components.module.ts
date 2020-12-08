import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlErrorModule} from './control-error/control-error.module';
import {ProfileCardModule} from './profile-card/profile-card.module';
import {RecipeFormModule} from './recipe-form/recipe-form.module';
import {SidebarModule} from './sidebar/sidebar.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ControlErrorModule,
        ProfileCardModule,
        RecipeFormModule,
        SidebarModule
    ],
    exports: [
        ControlErrorModule,
        ProfileCardModule,
        RecipeFormModule,
        SidebarModule
    ]
})
export class ComponentsModule {

}

