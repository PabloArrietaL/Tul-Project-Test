import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}

  public create(data: { nombre: string; url: string }) {
    return this.firestore.collection('products').add(data);
  }

  public getById(documentId: string) {
    return this.firestore
      .collection('products')
      .doc(documentId)
      .snapshotChanges();
  }

  public get() {
    return this.firestore.collection('products').snapshotChanges();
  }

  public update(documentId: string, data: any) {
    return this.firestore.collection('products').doc(documentId).set(data);
  }
}
