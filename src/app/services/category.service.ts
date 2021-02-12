import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Category } from '@Utils/types/category.type';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  public create(data: Category, file: File) {
    const timestamp = new Date().getTime();
    const name = timestamp + file.name;
    return from(this.storage.upload(name, file)).pipe(
      switchMap(() => {
        const ref = this.storage.ref(name);
        return ref.getDownloadURL().pipe(
          switchMap((url) => {
            data.image.url = url;
            return from(this.firestore.collection('categories').add(data));
          })
        );
      })
    );
  }

  public delete(item: Category) {
    return from(
      this.firestore.collection('categories').doc(item.id).delete()
    ).pipe(
      switchMap(() => {
        return this.storage.refFromURL(item.image.url).delete();
      })
    );
  }

  public getMapped() {
    return this.firestore
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((value) => {
          const temp: Category[] = [];
          value.forEach((item) => {
            temp.push({
              ...(item.payload.doc.data() as Category),
              id: item.payload.doc.id,
            });
          });
          return temp;
        })
      );
  }

  public update(documentId: string, data: Category) {
    return from(
      this.firestore.collection('categories').doc(documentId).set(data)
    );
  }
}
