import { Component, Input } from '@angular/core';
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
  public modalRef!: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openDetail() {
    const initialState = {
      product: this.product,
    };
    this.modalService.show(ProductDetailComponent, {
      class: 'modal-dialog-centered modal-lg',
      initialState,
    });
  }
}
