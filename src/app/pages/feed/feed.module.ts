import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {FeedPageRoutingModule} from './feed-routing.module';

import {FeedPage} from './feed.page';
import {FeedCardModule} from '../../components/feed-card/feed-card.module';
import {SidebarModule} from '../../components/sidebar/sidebar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FeedPageRoutingModule,
        FeedCardModule,
        SidebarModule
    ],
    declarations: [FeedPage]
})
export class FeedPageModule {
}
