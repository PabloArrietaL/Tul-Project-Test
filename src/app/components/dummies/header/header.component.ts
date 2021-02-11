import { Component, OnInit } from '@angular/core';
import { CartProvider } from '@Core/providers/cart.provider';
import { AuthenticationService } from '@services/authentication.service';
import { ProductDetail } from '@Utils/types/product.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public quantity: number = 0;

  constructor(
    private service: AuthenticationService,
    private cart: CartProvider
  ) {}

  ngOnInit(): void {
    this.cart.cartSession$.subscribe((cart) => {
      this.quantity = 0;
      cart.forEach((item) => {
        this.quantity += item.quantity;
      });
    });
  }

  logout() {
    this.service.signOut();
  }
}
