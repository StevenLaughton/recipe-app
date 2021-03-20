import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  categories$: Observable<Array<string>> = this.store.pipe(
    select(selectRecipeCategories),
  );

  loaded$: Observable<boolean> = this.store.pipe(select(recipesLoaded));
  isLoggedIn$: Observable<boolean> = this.store.pipe(select(isLoggedIn));

  vegetarianSelected$: Observable<boolean> = this.store.pipe(
    select(selectVegetarianFilter),
  );

  constructor(
    private readonly authService: AuthService,
    private readonly store: Store,
  ) {}

  async logout(): Promise<void> {
    await this.authService.SignOut();
  }

  selectCategory(category: string | null): void {
    this.store.dispatch(setSelectedCategory({ category }));
  }

  toggleVegetarian(): void {
    this.store.dispatch(toggleFilterVegetarian());
  }
}
