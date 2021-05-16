export class Ingredient {
  amount: number;
  name: string;

  constructor(amount?: number, name?: string) {
    this.amount = amount ?? 0;
    this.name = name ?? '';
  }
}
