import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Checkout } from '@Utils/types/checkout.type';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private firestore: AngularFirestore) {}

  public create(data: Checkout) {
    return from(this.firestore.collection('checkouts').add(data));
  }
}
