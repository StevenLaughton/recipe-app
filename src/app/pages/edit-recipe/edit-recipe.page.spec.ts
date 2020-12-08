import {EditRecipePage} from './edit-recipe.page';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {ImageService} from '../../core/services/image.service';
import {RecipeService} from '../../core/services/recipe.service';
import {RouterTestingModule} from '@angular/router/testing';
import {EditRecipePageModule} from './edit-recipe.module';

describe('EditRecipePage', () => {
    let component: EditRecipePage;
    let fixture: MockedComponentFixture<EditRecipePage>;

    beforeEach(() => {
        return MockBuilder(EditRecipePage, EditRecipePageModule)
            .mock(ImageService)
            .mock(RecipeService)
            .keep(RouterTestingModule);
    });

    beforeEach(() => {
        fixture = MockRender(EditRecipePage);
        component = fixture.point.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
