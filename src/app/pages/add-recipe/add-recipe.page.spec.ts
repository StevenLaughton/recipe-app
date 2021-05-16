import { AddRecipePage } from './add-recipe.page';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AddRecipePageModule } from './add-recipe.module';

describe('AddRecipePage', () => {
  let component: AddRecipePage;
  let fixture: MockedComponentFixture<AddRecipePage>;

  beforeEach(() => {
    return MockBuilder(AddRecipePage, AddRecipePageModule).build();
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
