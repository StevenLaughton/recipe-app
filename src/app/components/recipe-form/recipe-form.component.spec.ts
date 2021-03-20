import {RecipeFormComponent} from './recipe-form.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {RecipeFormModule} from './recipe-form.module';
import {CategoryService} from '../../services/category.service';
import {ImageService} from '../../services/image.service';

describe('RecipeFormComponent', () => {
    let component: RecipeFormComponent;
    let fixture: MockedComponentFixture<RecipeFormComponent>;

    beforeEach(async () => {
        return MockBuilder(RecipeFormComponent, RecipeFormModule)
            .mock(CategoryService)
            .mock(ImageService);
    });

    beforeEach(() => {
        fixture = MockRender(RecipeFormComponent);
        component = fixture.point.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
