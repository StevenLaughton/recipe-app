export class Recipe {
  id: string;
  name: string;
  portions: number;
  time: string;
  category: string;
  vegetarian: boolean;
  ingredients: string[];
  steps: string[];

  constructor(
    id?: string,
    name?: string,
    portions?: number,
    time?: string,
    category?: string,
    ingredients?: string[],
    vegetarian?: boolean,
    steps?: string[]
  ) {
    this.id = id ?? '';
    this.name = name ?? '';
    this.portions = portions ?? 0;
    this.time = time ?? '';
    this.category = category ?? '';
    this.vegetarian = vegetarian ?? false;
    this.ingredients = ingredients ?? [];
    this.steps = steps ?? [];
  }
}
