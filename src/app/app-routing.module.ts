import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './shared/constants/routes.const';

const routes: Routes = [
  {
    path: AppRoutes.Base,
    redirectTo: AppRoutes.Login,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.Add,
    loadChildren: () =>
      import('./pages/add-recipe/add-recipe.module').then(
        (m) => m.AddRecipePageModule,
      ),
  },
  {
    path: `${AppRoutes.Edit}/:id`,
    loadChildren: () =>
      import('./pages/edit-recipe/edit-recipe.module').then(
        (m) => m.EditRecipePageModule,
      ),
  },
  {
    path: AppRoutes.Feed,
    loadChildren: () =>
      import('./pages/feed/feed.module').then((m) => m.FeedPageModule),
  },
  {
    path: AppRoutes.Login,
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: `${AppRoutes.View}/:id`,
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
