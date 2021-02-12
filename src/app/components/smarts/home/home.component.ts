import { Component, OnInit } from '@angular/core';
import { CartProvider } from '@Core/providers/cart.provider';
import { CartStoreService } from '@Redux/service/cart.service';
import { CategoryService } from '@services/category.service';
import { ProductService } from '@services/product.service';
import { ToastClass } from '@Utils/class/toast.class';
import { Category } from '@Utils/types/category.type';
import { Product, ProductDetail } from '@Utils/types/product.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public products: Product[] = [];
  public productsFiltered: Product[] = [];
  public category$!: Observable<Category[]>;
  public category: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cart: CartStoreService // private cart: CartProvider
  ) {}

  ngOnInit(): void {
    this.productService.getMapped().subscribe((data) => {
      this.products = data;
      this.setFilter('', '');
    });
    this.category$ = this.categoryService.getMapped();
  }

  setFilter(categoryId: string, name: string) {
    if (categoryId === '') {
      this.category = '';
      this.productsFiltered = this.products;
    } else {
      this.category = name;
      this.productsFiltered = this.products.filter(
        (pr) => pr.categoryId === categoryId
      );
    }
  }

  addToCart(product: Product) {
    const detail: ProductDetail = {
      product,
      quantity: 1,
    };
    this.cart.addItem(detail);
    // this.cart.setCartSessionBs(detail);
    ToastClass.successToast('Product Added to cart');
  }
}
