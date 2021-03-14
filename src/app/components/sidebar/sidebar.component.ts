import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FeedService } from '../../services/feed.service';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase';
import User = firebase.User;
import { select, Store } from '@ngrx/store';
import { BeginGetCategoriesAction } from 'src/app/core/categories/category.actions';
import { getCategoriesState } from 'src/app/core/categories/category.selectors';
import { CategoryState } from 'src/app/core/categories/category.reducer';
import { tap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnDestroy {
  loading$ = new BehaviorSubject<boolean>(true);
  categories$ = new BehaviorSubject<Array<string>>(['']);
  user$: Observable<User | null>;
  selectedCategory: string | null = '';
  vegetarianSelected = false;

  constructor(
    readonly authService: AuthService,
    private readonly feedService: FeedService,
    private readonly store: Store,
  ) {
    this.store.dispatch(BeginGetCategoriesAction());
    this.user$ = authService.getUser();

    this.store
      .pipe(
        select(getCategoriesState),
        tap((state: CategoryState) => this.loading$.next(state.loading)),
        tap((state: CategoryState) => this.categories$.next(state.items)),
        untilDestroyed(this),
      )
      .subscribe();
  }

  ngOnDestroy(): void {}

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
