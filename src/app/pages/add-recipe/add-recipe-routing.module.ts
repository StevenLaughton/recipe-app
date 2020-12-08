import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AddRecipePage} from './add-recipe.page';
import {AuthGuard} from '../../core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: AddRecipePage,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AddRecipePageRoutingModule {
}
