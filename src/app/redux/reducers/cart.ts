import { Action, createReducer, on } from '@ngrx/store';
import { ProductDetail } from '@Utils/types/product.type';
import * as cart from '../actions/cart';

export const cartKey = 'cartMethod';

export interface State {
  entities: ProductDetail[];
}

export const initialState: State = {
  entities: [],
};

const cartReducer = createReducer(
  initialState,
  on(cart.AddCartItems, (state, { item }) => {
    let items: ProductDetail[] = [];
    items.push(...state.entities);
    const index = items.indexOf(
      items.find((x) => x.product.id === item.product.id) as ProductDetail
    );
    if (index === -1) items.push(item);
    else {
      const aux = [...items];
      aux[index] = {
        product: item.product,
        quantity: items[index].quantity + item.quantity,
      };
      items = aux;
    }
    localStorage.setItem('cart', JSON.stringify(items));
    return {
      ...state,
      entities: items,
    };
  }),
  on(cart.GetCartItems, (state) => {
    return { ...state };
  }),
  on(cart.AddAllItems, (state, { items }) => {
    return { ...state, entities: items };
  }),
  on(cart.DeleteItem, (state, { item }) => {
    const products: ProductDetail[] = [];
    products.push(...state.entities);
    const index = products.indexOf(
      products.find((x) => x.product.id === item.product.id) as ProductDetail
    );
    products.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(products));
    return { ...state, entities: products };
  }),
  on(cart.Clear, (state) => {
    localStorage.removeItem('cart');
    return { ...state, entities: [] };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return cartReducer(state, action);
}
