import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FeedService } from '../../core/services/feed.service';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import User = firebase.User;
import { select, Store } from '@ngrx/store';
import { loadDataBegin } from 'src/app/core/categories/category.actions';
import {
  getCategories,
  getCategoriesState,
} from 'src/app/core/categories/category.selectors';
import { CategoryState } from 'src/app/core/categories/category.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  categories$: Observable<string[]> = this.store.select(getCategories);
  user$: Observable<User | null>;
  selectedCategory: string | null = '';
  vegetarianSelected = false;

  constructor(
    readonly authService: AuthService,
    private readonly feedService: FeedService,
    private store: Store,
  ) {
    this.store.dispatch(loadDataBegin());
    this.user$ = authService.getUser();
    this.store
      .pipe(select(getCategoriesState))
      .subscribe((state: CategoryState) => console.log(state));
  }

  async logout(): Promise<void> {
    await this.authService.SignOut();
  }

  selectCategory(category: string | null): void {
    this.selectedCategory = category;
    this.feedService.filterByCategory(category);
  }

  toggleVegetarian(): void {
    this.vegetarianSelected = !this.vegetarianSelected;
    this.feedService.filterByVegetarian(this.vegetarianSelected);
  }
}
