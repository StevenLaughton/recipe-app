import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/core/services/auth.service';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {CategoryService} from '../../core/services/category.service';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    selectedCategory = '';
    categories$: Observable<string[]> = new Observable<string[]>();

    constructor(readonly authService: AuthService,
                private readonly categoryService: CategoryService) {
        this.authService.getUser().pipe(take(1)).subscribe(user => {
            if (user) {
                this.categories$ = categoryService.getCategories();
            }
        });

    }

    ngOnInit(): void {
    }

    async logout(): Promise<void> {
        await this.authService.SignOut();
    }

    selectCategory(category?: string): void {
        console.log(category);
        this.selectedCategory = category ?? '';
        this.categoryService.applyFilter(category);
    }
}
