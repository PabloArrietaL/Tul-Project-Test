import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private firestore: AngularFirestore) {}

  public create(data: { nombre: string; url: string }) {
    return this.firestore.collection('categories').add(data);
  }

  public getById(documentId: string) {
    return this.firestore
      .collection('categories')
      .doc(documentId)
      .snapshotChanges();
  }

  public get() {
    return this.firestore.collection('categories').snapshotChanges();
  }

  public update(documentId: string, data: any) {
    return this.firestore.collection('categories').doc(documentId).set(data);
  }
}
