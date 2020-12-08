import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import {IonicModule} from '@ionic/angular';
import {ProfileCardModule} from '../profile-card/profile-card.module';


@NgModule({
    declarations: [SidebarComponent],
    imports: [
        CommonModule,
        IonicModule,
        ProfileCardModule
    ],
    exports: [SidebarComponent]
})
export class SidebarModule {
}
