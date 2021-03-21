import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './recipe-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UploadImageModule } from '../upload-image/upload-image.module';

@NgModule({
  declarations: [RecipeFormComponent],
  imports: [CommonModule, ReactiveFormsModule, IonicModule, UploadImageModule],
  exports: [RecipeFormComponent],
})
export class RecipeFormModule {}
