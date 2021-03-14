import {ViewRecipePage} from './view-recipe.page';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {ImageService} from '../../services/image.service';
import {RecipeService} from '../../services/recipe.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ViewRecipePageModule} from './view-recipe.module';

describe('ViewRecipePage', () => {
    let component: ViewRecipePage;
    let fixture: MockedComponentFixture<ViewRecipePage>;

    beforeEach(() => {
        return MockBuilder(ViewRecipePage, ViewRecipePageModule)
            .mock(ImageService)
            .mock(RecipeService)
            .keep(RouterTestingModule.withRoutes([]));

    });

    beforeEach(() => {
        fixture = MockRender(ViewRecipePage);
        component = fixture.point.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
