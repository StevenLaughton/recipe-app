import { CategoryState } from './categories/category.reducer';
import { UserState } from './users/user.reducer';

export interface AppState {
  categories: CategoryState;
  user: UserState;
}
