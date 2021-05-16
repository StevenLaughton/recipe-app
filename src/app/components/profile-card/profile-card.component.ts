import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { selectCurrentUser } from 'src/app/core/users/user.selectors';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent {
  user$: Observable<User> = this.store.select(selectCurrentUser);

  constructor(private readonly store: Store) {}
}
