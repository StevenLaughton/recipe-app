import {ToastController} from '@ionic/angular';

import {AddRecipePage} from './add-recipe.page';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {ImageService} from '../../services/image.service';
import {RecipeService} from '../../services/recipe.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AddRecipePageModule} from './add-recipe.module';

describe('AddRecipePage', () => {
    let component: AddRecipePage;
    let fixture: MockedComponentFixture<AddRecipePage>;

    beforeEach(() => {
        return MockBuilder(AddRecipePage, AddRecipePageModule)
            .mock(ImageService)
            .mock(RecipeService)
            .mock(ToastController)
            .keep(RouterTestingModule);
    });

    beforeEach(() => {
        fixture = MockRender(AddRecipePage);
        component = fixture.point.componentInstance;
        fixture.detectChanges();
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
