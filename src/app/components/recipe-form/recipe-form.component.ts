import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {CategoryService} from '../../core/services/category.service';
import {Recipe} from '../../shared/models/recipe.model';
import {ImageService} from '../../core/services/image.service';

@Component({
    selector: 'app-recipe-form',
    templateUrl: './recipe-form.component.html',
    styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit, OnDestroy {

    constructor(private readonly categoryService: CategoryService,
                private readonly formBuilder: FormBuilder,
                public imageService: ImageService) {
        this.categories$ = categoryService.getCategories();
    }

    private delimiter = '..';
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
            portions: [recipe.portions, Validators.required],
            time: [recipe.time, Validators.required],
            category: [recipe.category, Validators.required],
            vegetarian: [recipe.vegetarian],
            ingredients: [recipe.ingredients.join(this.delimiter),
                [Validators.required, Validators.pattern('(([0-9])+\\s+([a-zA-Z0-9\\s])+(\\.\\.)+)+([0-9])+\\s+([a-zA-Z0-9\\s])+')]],
            steps: [recipe.steps.join(this.delimiter), Validators.required]
        });
    }

    ngOnInit(): void {
        this.form = this.initialiseForm(this.recipe);
    }


    async ngOnDestroy(): Promise<void> {
        await this.imageService.deleteFromStorage();
    }

    toggleCategory(): void {
        this.createNewCategory = !this.createNewCategory;
        this.form?.controls.category.reset();
    }

    onSubmit(): void {
        if (this.form && this.form.valid) {
            const recipeToAdd = this.form.getRawValue() as Recipe;
            recipeToAdd.ingredients = this.form.controls.ingredients.value.split(this.delimiter).map((i: string) => i.trim());
            recipeToAdd.steps = this.form.controls.steps.value.split(this.delimiter).map((i: string) => i.trim());

            this.formSubmitted.emit(recipeToAdd);
        }
    }

}

