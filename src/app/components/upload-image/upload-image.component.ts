import {Component, OnDestroy} from '@angular/core';
import {ImageService} from '../../core/services/image.service';

@Component({
    selector: 'app-upload-image',
    templateUrl: './upload-image.component.html',
    styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnDestroy {

    constructor(
        public imageService: ImageService) {
    }

    async ngOnDestroy(): Promise<void> {
        await this.imageService.deleteFromStorage();
    }

}
