import { RecipeDto } from 'src/app/shared/models/recipe.dto.model';
import * as fromSelectedRecipe from './selected-recipe.actions';

describe('loadSelectedRecipes', () => {
  it('should return an action', () => {
    expect(
      fromSelectedRecipe.setSelectedRecipe({ recipe: new RecipeDto(undefined) })
        .type,
    ).toBe('[SelectedRecipe] Set Selected Recipe');
  });
});
