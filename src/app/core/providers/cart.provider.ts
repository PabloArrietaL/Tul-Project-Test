import { Injectable } from '@angular/core';
import { ProductDetail } from '@Utils/types/product.type';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartProvider {
  private cartSessionBs = new BehaviorSubject<ProductDetail[]>(
    JSON.parse(localStorage.getItem('cart') as string) || []
  );
  public cartSession$: Observable<
    ProductDetail[]
  > = this.cartSessionBs.asObservable();

  setCartSessionBs(cart: ProductDetail): void {
    const products: ProductDetail[] =
      JSON.parse(localStorage.getItem('cart') as string) || [];
    const index = products.indexOf(
      products.find((x) => x.product.id === cart.product.id) as ProductDetail
    );
    if (index === -1) products.push(cart);
    else products[index].quantity += cart.quantity;

    localStorage.setItem('cart', JSON.stringify(products));
    this.cartSessionBs.next(products);
  }

  resetSessionBs() {
    this.cartSessionBs.next([]);
  }
}
