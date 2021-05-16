import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { isLoggedIn } from 'src/app/core/users/user.selectors';
import {
  recipesLoaded,
  selectRecipeCategories,
  selectVegetarianFilter,
} from 'src/app/core/recipes/recipes.selectors';
import {
  setSelectedCategory,
  toggleFilterVegetarian,
} from 'src/app/core/recipes/recipes.actions';
import { signOut } from 'src/app/core/users/user.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  categories$: Observable<Array<string>> = this.store.select(
    selectRecipeCategories,
  );

  loaded$: Observable<boolean> = this.store.select(recipesLoaded);
  isLoggedIn$: Observable<boolean> = this.store.select(isLoggedIn);

  vegetarianSelected$: Observable<boolean> = this.store.select(
    selectVegetarianFilter,
  );

  constructor(private readonly store: Store) {}

  logout(): void {
    this.store.dispatch(signOut());
  }

  selectCategory(category: string | null): void {
    this.store.dispatch(setSelectedCategory({ category }));
  }

  toggleVegetarian(): void {
    this.store.dispatch(toggleFilterVegetarian());
  }
}
