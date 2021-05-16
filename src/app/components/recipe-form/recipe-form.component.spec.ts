import { RecipeFormComponent } from './recipe-form.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { RecipeFormModule } from './recipe-form.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { RecipeModelMock } from 'src/app/core/mock/recipe.model.mock';

describe('RecipeFormComponent', () => {
  beforeEach(() =>
    MockBuilder(RecipeFormComponent, RecipeFormModule)
      .keep(FormBuilder)
      .keep(ReactiveFormsModule)
      .provide(provideMockStore()),
  );

  it('should create', () => {
    const fixture = MockRender(RecipeFormComponent, {
      recipe: RecipeModelMock.createOne(),
    });
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
