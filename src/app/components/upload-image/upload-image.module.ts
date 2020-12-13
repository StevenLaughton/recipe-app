import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadImageComponent} from './upload-image.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [UploadImageComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
    exports: [UploadImageComponent]
})
export class UploadImageModule {
}
