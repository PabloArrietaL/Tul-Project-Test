import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductDetailComponent } from '@Dummies/product-detail/product-detail.component';
import { Product } from '@Utils/types/product.type';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart: EventEmitter<Product> = new EventEmitter<Product>();
  public modalRef!: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openDetail(): void {
    const initialState = {
      product: this.product,
    };
    this.modalService.show(ProductDetailComponent, {
      class: 'modal-dialog-centered modal-lg',
      initialState,
    });
  }

  emitProduct(): void {
    this.addToCart.emit(this.product);
  }
}
