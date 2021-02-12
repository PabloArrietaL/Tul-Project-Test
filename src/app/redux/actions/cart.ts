import { createAction, props } from '@ngrx/store';
import { ProductDetail } from '@Utils/types/product.type';

const GET_ITEMS = 'GET_ITEMS';
const ADD_ITEMS = 'ADD_ITEMS';
const ADD_ALL = 'ADD_ALL';
const DELETE_ITEM = 'DELETE_ITEM';
const CLEAR = 'CLEAR';

export const GetCartItems = createAction(GET_ITEMS);

export const AddCartItems = createAction(
  ADD_ITEMS,
  props<{ item: ProductDetail }>()
);

export const AddAllItems = createAction(
  ADD_ALL,
  props<{ items: ProductDetail[] }>()
);

export const DeleteItem = createAction(
  DELETE_ITEM,
  props<{ item: ProductDetail }>()
);

export const Clear = createAction(CLEAR);
