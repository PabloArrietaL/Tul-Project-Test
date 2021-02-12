import { Component, OnInit } from '@angular/core';
import { CartProvider } from '@Core/providers/cart.provider';
import { CheckoutService } from '@services/checkout.service';
import { ToastClass } from '@Utils/class/toast.class';
import { Checkout } from '@Utils/types/checkout.type';
import { ProductDetail } from '@Utils/types/product.type';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public products: ProductDetail[] = [];
  public total: number = 0;

  constructor(
    private cart: CartProvider,
    private service: CheckoutService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.cart.cartSession$.subscribe((data) => {
      this.products = data;
      this.total = 0;
      this.products.forEach((item) => {
        this.total += item.product.price * item.quantity;
      });
    });
  }

  deleteItem(detail: ProductDetail) {
    this.cart.deleteProductCart(detail);
  }

  saveCheckout() {
    this.spinner.show();
    const checkout: Checkout = {
      total: this.total,
      detail: this.products,
    };
    this.service.create(checkout).subscribe(
      () => {
        ToastClass.successToast('The order was registered');
        this.spinner.hide();
        this.cart.resetSessionBs();
      },
      (error) => {
        this.spinner.hide();
        ToastClass.errorToast(error.message);
      }
    );
  }
}
