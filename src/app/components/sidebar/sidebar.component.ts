import {Component} from '@angular/core';
import {AuthService} from 'src/app/core/services/auth.service';
import {CategoryService} from '../../core/services/category.service';
import {FeedService} from '../../core/services/feed.service';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import User = firebase.User;


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    categories$: Observable<string[]>;
    user$: Observable<User | null>;
    selectedCategory: string | null = '';
    vegetarianSelected: boolean;

    constructor(readonly authService: AuthService,
                private readonly categoryService: CategoryService,
                private readonly feedService: FeedService) {
        this.categories$ = categoryService.getCategories();
        this.user$ = authService.getUser();
        this.vegetarianSelected = true;
    }

    async logout(): Promise<void> {
        await this.authService.SignOut();
    }

    selectCategory(category: string | null): void {
        console.log(`selected category: ${category}`);
        this.selectedCategory = category;
        this.feedService.filterByCategory(category);
    }

    toggleVegetarian(): void {
        this.vegetarianSelected = !this.vegetarianSelected;
        console.log(`Show Vegetarian: ${this.vegetarianSelected}`);
        this.feedService.filterByVegetarian(this.vegetarianSelected);
    }
}
