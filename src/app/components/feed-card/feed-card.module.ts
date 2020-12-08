import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedCardComponent} from './feed-card.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [FeedCardComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [FeedCardComponent]
})
export class FeedCardModule {
}
