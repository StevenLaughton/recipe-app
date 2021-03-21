import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { IonicModule } from '@ionic/angular';
import { ProfileCardModule } from '../profile-card/profile-card.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, IonicModule, ProfileCardModule, FormsModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
