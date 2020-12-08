import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditRecipePage} from './edit-recipe.page';
import {AuthGuard} from '../../core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: EditRecipePage,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EditRecipePageRoutingModule {
}
