import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private afauth: AngularFireAuth) { }

  signIn(email: string, password: string) {
    return this.afauth.createUserWithEmailAndPassword(email, password).then(userCredentials => {
      if (userCredentials.user)
        localStorage.setItem('user', userCredentials.user.uid)
    })
  }

  logIn(email: string, password: string) {
    return this.afauth.signInWithEmailAndPassword(email, password).then(userCredentials => {
      if (userCredentials.user)
        localStorage.setItem('user', userCredentials.user.uid)
    })
  }

  signOut() {
    return this.afauth.signOut()
  }

  isLoggedIn(): boolean {
    let currentUser = localStorage.getItem('user');
    if (currentUser) {
      return true;
    } else {
      return false;
    }
  }

}
