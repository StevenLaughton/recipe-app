import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRecipePopoverComponent } from './view-recipe-popover.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewRecipePopoverComponent],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  exports: [ViewRecipePopoverComponent],
})
export class ViewRecipePopoverModule {}
