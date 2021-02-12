import { Component } from '@angular/core';
import { CartStoreService } from '@Redux/service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private cart: CartStoreService) {
    const store = localStorage.getItem('cart');
    if (store && JSON.parse(store).length > 0) {
      this.cart.addItems(JSON.parse(store));
    }
  }
}
