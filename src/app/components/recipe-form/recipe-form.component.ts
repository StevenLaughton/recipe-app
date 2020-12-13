import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {CategoryService} from '../../core/services/category.service';
import {Recipe} from '../../shared/models/recipe.model';

@Component({
    selector: 'app-recipe-form',
    templateUrl: './recipe-form.component.html',
    styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {

    get name() {
        return this.form?.controls.name;
    }

    get portions() {
        return this.form?.controls.portions;
    }

    get category() {
        return this.form?.controls.category;
    }

    get time() {
        return this.form?.controls.time;
    }

    get ingredients() {
        return this.form?.controls.ingredients;
    }

    get steps() {
        return this.form?.controls.steps;
    }

    constructor(private readonly categoryService: CategoryService,
                private readonly formBuilder: FormBuilder) {
        this.categories$ = categoryService.getCategories();
    }

    private delimiter = '..';
    private ingredientsRegex = /(^(\d*\.)?\d+\s+[\w\s\d]+\s+\.\.+\s+)+((\d*\.)?\d+\s+[\w\s\d]+\s+)/gm;
    timeOptions = ['<15', '15', '30', '45', '60', '>60'];

    @Input()
    recipe: Recipe = new Recipe();

    @Output()
    formSubmitted = new EventEmitter<Recipe>();

    form: FormGroup | undefined;
    categories$: Observable<string[]>;
    createNewCategory = false;

    private initialiseForm(recipe: Recipe): FormGroup {
        return this.formBuilder.group({
            name: [recipe.name, Validators.required],
            portions: [recipe.portions, [Validators.required, Validators.min(1), Validators.max(10)]],
            time: [recipe.time, Validators.required],
            category: [recipe.category, Validators.required],
            vegetarian: [recipe.vegetarian],
            ingredients: [recipe.ingredients.join(this.delimiter),
                [Validators.required, Validators.pattern(this.ingredientsRegex)]],
            steps: [recipe.steps.join(this.delimiter), Validators.required]
        });
    }

    ngOnInit(): void {
        this.form = this.initialiseForm(this.recipe);
    }

    toggleCategory(): void {
        this.createNewCategory = !this.createNewCategory;
        this.form?.controls.category.reset();
    }

    onSubmit(): void {
        if (this.form && this.form.valid) {
            const recipeToAdd = this.form.getRawValue() as Recipe;
            recipeToAdd.id = this.recipe.id;
            recipeToAdd.ingredients = this.form.controls.ingredients.value.split(this.delimiter).map((i: string) => i.trim());
            recipeToAdd.steps = this.form.controls.steps.value.split(this.delimiter).map((i: string) => i.trim());

            this.formSubmitted.emit(recipeToAdd);
        } else {
            this.form?.markAllAsTouched();
        }
    }
}

