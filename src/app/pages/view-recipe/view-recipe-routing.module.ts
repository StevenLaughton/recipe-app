import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRecipePage } from './view-recipe.page';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ViewRecipePage,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRecipePageRoutingModule {}
