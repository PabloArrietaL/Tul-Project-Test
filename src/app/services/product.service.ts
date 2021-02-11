import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Product } from '@Utils/types/product.type';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  public create(data: Product, file: File) {
    const timestamp = new Date().getTime();
    const name = timestamp + file.name;
    return from(this.storage.upload(name, file)).pipe(
      switchMap(() => {
        const ref = this.storage.ref(name);
        return ref.getDownloadURL().pipe(
          switchMap((url) => {
            data.image.url = url;
            return from(this.firestore.collection('products').add(data));
          })
        );
      })
    );
  }

  public delete(item: Product) {
    return from(
      this.firestore.collection('products').doc(item.id).delete()
    ).pipe(
      switchMap(() => {
        return this.storage.refFromURL(item.image.url).delete();
      })
    );
  }

  public get() {
    return this.firestore.collection('products').snapshotChanges();
  }

  public getMapped() {
    return this.firestore
      .collection('products')
      .snapshotChanges()
      .pipe(
        map((value) => {
          const temp: Product[] = [];
          value.forEach((item) => {
            temp.push({
              ...(item.payload.doc.data() as Product),
              id: item.payload.doc.id,
            });
          });
          return temp;
        })
      );
  }

  public update(documentId: string, data: Product) {
    return from(
      this.firestore.collection('products').doc(documentId).set(data)
    );
  }
}
