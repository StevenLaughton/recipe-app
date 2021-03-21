import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedCardComponent } from './feed-card.component';
import { IonicModule } from '@ionic/angular';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [FeedCardComponent],
  imports: [CommonModule, IonicModule, AngularFireStorageModule],
  exports: [FeedCardComponent],
})
export class FeedCardModule {}
