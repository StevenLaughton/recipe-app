import { Ingredient } from './ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeDto {
  id: string;
  name: string;
  portions: number;
  time: string;
  category: string;
  vegetarian: boolean;
  ingredients: Ingredient[];
  steps: string[];

  constructor(recipe: Recipe | undefined) {
    this.id = recipe?.id ?? '';
    this.name = recipe?.name ?? '';
    this.portions = recipe?.portions ?? 0;
    this.time = recipe?.time ?? '';
    this.category = recipe?.category ?? '';
    this.vegetarian = recipe?.vegetarian ?? false;
    this.ingredients = this.separateIngredients(recipe?.ingredients ?? ['']);
    this.steps = recipe?.steps ?? [''];
  }

  private separateIngredients(ingredients: string[]): Ingredient[] {
    return ingredients.map((ingredient) => {
      return new Ingredient(
        +ingredient.substring(0, ingredient.indexOf(' ')),
        ingredient.substring(ingredient.indexOf(' ') + 1, ingredient.length),
      );
    });
  }
}
