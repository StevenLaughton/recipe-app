import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileCardModule} from './profile-card/profile-card.module';
import {RecipeFormModule} from './recipe-form/recipe-form.module';
import {SidebarModule} from './sidebar/sidebar.module';
import {ViewRecipePopoverModule} from './view-recipe-popover/view-recipe-popover.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ProfileCardModule,
        RecipeFormModule,
        SidebarModule,
        ViewRecipePopoverModule
    ],
    exports: [
        ProfileCardModule,
        RecipeFormModule,
        SidebarModule,
        ViewRecipePopoverModule
    ]
})
export class ComponentsModule {

}

