import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ViewRecipePageRoutingModule } from './view-recipe-routing.module';
import { ViewRecipePage } from './view-recipe.page';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRecipePageRoutingModule,
    PipesModule,
  ],
  declarations: [ViewRecipePage],
})
export class ViewRecipePageModule {}
