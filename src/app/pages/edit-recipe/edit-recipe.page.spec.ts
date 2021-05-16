import { EditRecipePage } from './edit-recipe.page';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { EditRecipePageModule } from './edit-recipe.module';

describe('EditRecipePage', () => {
  let component: EditRecipePage;
  let fixture: MockedComponentFixture<EditRecipePage>;

  beforeEach(() => {
    return MockBuilder(EditRecipePage, EditRecipePageModule).build();
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
