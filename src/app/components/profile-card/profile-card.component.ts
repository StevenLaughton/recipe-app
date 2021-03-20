import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentUser } from 'src/app/core/users/user.selectors';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent {
  user$: Observable<User> = this.store.pipe(select(selectCurrentUser));

  constructor(private readonly store: Store) {}
}
