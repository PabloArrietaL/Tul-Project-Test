import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Category } from '@Utils/types/category.type';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  public create(data: Category) {
    const ref = this.storage.ref(data.image.split(',')[1]);
    return ref.getDownloadURL().pipe(
      switchMap((url) => {
        console.log(url);

        data.image = url;
        return from(this.firestore.collection('categories').add(data));
      })
    );
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
