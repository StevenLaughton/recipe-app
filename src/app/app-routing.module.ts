import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ADD,
  BASE,
  EDIT,
  FEED,
  LOGIN,
  VIEW,
} from './shared/constants/routes.const';

const routes: Routes = [
  {
    path: BASE,
    redirectTo: LOGIN,
    pathMatch: 'full',
  },
  {
    path: ADD,
    loadChildren: () =>
      import('./pages/add-recipe/add-recipe.module').then(
        (m) => m.AddRecipePageModule,
      ),
  },
  {
    path: `${EDIT}/:id`,
    loadChildren: () =>
      import('./pages/edit-recipe/edit-recipe.module').then(
        (m) => m.EditRecipePageModule,
      ),
  },
  {
    path: FEED,
    loadChildren: () =>
      import('./pages/feed/feed.module').then((m) => m.FeedPageModule),
  },
  {
    path: LOGIN,
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: `${VIEW}/:id`,
    loadChildren: () =>
      import('./pages/view-recipe/view-recipe.module').then(
        (m) => m.ViewRecipePageModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
