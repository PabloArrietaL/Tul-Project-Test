import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cartKey, State } from '../reducers/cart';

export const getCartState = createFeatureSelector<State>(cartKey);

export const getCartItemsList = createSelector(
  getCartState,
  (state: State) => state.entities
);
