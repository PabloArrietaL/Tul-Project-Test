import { Injectable } from '@angular/core';
import { ProductDetail } from '@Utils/types/product.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartProvider {
  private cartSessionBs = new BehaviorSubject<Partial<ProductDetail[]>>(
    JSON.parse(localStorage.getItem('cart') as string) || []
  );
  public cartSession$ = this.cartSessionBs.asObservable();

  setCredentialSessionBs(cart: Partial<ProductDetail[]>): void {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSessionBs.next(cart);
  }
}
