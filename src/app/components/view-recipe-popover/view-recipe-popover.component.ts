import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'app-view-recipe-popover',
    templateUrl: './view-recipe-popover.component.html',
    styleUrls: ['./view-recipe-popover.component.scss'],
})
export class ViewRecipePopoverComponent implements OnInit {

    constructor(
        private readonly popover: PopoverController
    ) {
    }

    ngOnInit() {
    }

    async closePopover() {
       await this.popover.dismiss();
    }

}
