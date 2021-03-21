import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedPage } from './feed.page';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FeedPage,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedPageRoutingModule {}
