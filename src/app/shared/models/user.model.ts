import firebase from 'firebase';

export class User {
  id: string;
  displayName: string;
  email: string;
  photoUrl: string;

  constructor(user: firebase.User | null) {
    this.id = user?.uid ?? '';
    this.displayName = user?.displayName ?? '';
    this.email = user?.email ?? '';
    this.photoUrl = user?.photoURL ?? '';
  }
}
