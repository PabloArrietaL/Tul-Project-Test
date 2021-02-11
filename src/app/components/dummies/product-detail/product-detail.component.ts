import { Component, OnInit } from '@angular/core';
import { Product, ProductDetail } from '@Utils/types/product.type';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  public product!: Product;
  public detail!: ProductDetail;
  constructor(public modalRef: BsModalRef) {}

  ngOnInit(): void {
    this.detail = {
      product: this.product,
      quantity: 1,
    };
  }

  changeQuantity(control: string): void {
    if (control === 'add') this.detail.quantity++;
    else {
      this.detail.quantity === 1 ? 1 : this.detail.quantity--;
    }
  }
}
