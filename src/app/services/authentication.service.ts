import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CartProvider } from '@Core/providers/cart.provider';
import { Login } from '@Utils/types/user.type';
import firebase from 'firebase/app';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public user!: firebase.User;

  constructor(
    private afAuth: AngularFireAuth,
    public router: Router,
    private cart: CartProvider
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', '');
      }
    });
  }

  public signUp(data: Login) {
    return from(
      this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
    );
  }

  public signIn(data: Login) {
    return from(
      this.afAuth.signInWithEmailAndPassword(data.email, data.password)
    );
  }

  public async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.cart.resetSessionBs();
    this.router.navigate(['home']);
  }
}
