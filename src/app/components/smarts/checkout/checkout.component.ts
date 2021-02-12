import { Component, OnInit } from '@angular/core';
import { CartProvider } from '@Core/providers/cart.provider';
import { CartStoreService } from '@Redux/service/cart.service';
import { CheckoutService } from '@services/checkout.service';
import { ToastClass } from '@Utils/class/toast.class';
import { Checkout } from '@Utils/types/checkout.type';
import { ProductDetail } from '@Utils/types/product.type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public products: ProductDetail[] = [];
  public total: number = 0;

  constructor(
    private service: CheckoutService,
    private cart: CartStoreService // private cart: CartProvider
  ) {}

  ngOnInit(): void {
    this.cart.getCartItemsList$().subscribe((data) => {
      this.products = data;
      this.total = 0;
      this.products.forEach((item) => {
        this.total += item.product.price * item.quantity;
      });
    });

    // BS RXJS implementation
    // this.cart.cartSession$.subscribe((data) => {
    //   this.products = data;
    //   this.total = 0;
    //   this.products.forEach((item) => {
    //     this.total += item.product.price * item.quantity;
    //   });
    // });
  }

  deleteItem(detail: ProductDetail) {
    this.cart.deleteItem(detail);
  }

  saveCheckout() {
    const checkout: Checkout = {
      total: this.total,
      detail: this.products,
    };
    this.service.create(checkout).subscribe(
      () => {
        ToastClass.successToast('The order was registered');
        this.cart.clear();
      },
      (error) => {
        ToastClass.errorToast(error.message);
      }
    );
  }
}
