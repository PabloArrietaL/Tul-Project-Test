import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CartProvider } from '@Core/providers/cart.provider';
import { CartStoreService } from '@Redux/service/cart.service';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public quantity: number = 0;
  public isLogged!: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private service: AuthenticationService,
    private cart: CartStoreService // private cart: CartProvider
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) this.isLogged = true;
      else this.isLogged = false;
    });
  }

  ngOnInit(): void {
    this.cart.getCartItemsList$().subscribe((cart) => {
      this.quantity = 0;
      cart.forEach((item) => {
        this.quantity += item.quantity;
      });
    });

    /** BS RXJS Implementation */
    // this.cart.cartSession$.subscribe((cart) => {
    //   this.quantity = 0;
    //   cart.forEach((item) => {
    //     this.quantity += item.quantity;
    //   });
    // });
  }

  logout() {
    this.service.signOut();
  }
}
