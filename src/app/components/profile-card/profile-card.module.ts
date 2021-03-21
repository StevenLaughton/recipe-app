import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from './profile-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ProfileCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [ProfileCardComponent],
})
export class ProfileCardModule {}
