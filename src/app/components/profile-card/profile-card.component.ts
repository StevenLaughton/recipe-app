import { Component, Input } from '@angular/core';
import firebase from 'firebase';
import User = firebase.User;


@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent {
  @Input()
  user: User | undefined;

  constructor() {}

}
