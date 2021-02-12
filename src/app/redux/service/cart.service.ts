import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductDetail } from '@Utils/types/product.type';
import { Observable } from 'rxjs';
import * as CartActions from '../actions/cart';
import * as CartSelectors from '../selectors/cart';

@Injectable({
  providedIn: 'root',
})
export class CartStoreService {
  constructor(private store: Store<ProductDetail>) {}

  public getItems(): void {
    this.store.dispatch(CartActions.GetCartItems());
  }

  public addItem(item: ProductDetail): void {
    this.store.dispatch(
      CartActions.AddCartItems({
        item,
      })
    );
  }

  public addItems(items: ProductDetail[]): void {
    this.store.dispatch(
      CartActions.AddAllItems({
        items,
      })
    );
  }

  public deleteItem(item: ProductDetail): void {
    this.store.dispatch(
      CartActions.DeleteItem({
        item,
      })
    );
  }

  public clear(): void {
    this.store.dispatch(CartActions.Clear());
  }

  public getCartItemsList$(): Observable<ProductDetail[]> {
    return this.store.select(CartSelectors.getCartItemsList);
  }
}
