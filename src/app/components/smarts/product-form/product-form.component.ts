import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { Product } from '@Utils/types/product.type';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastClass } from '@Utils/class/toast.class';
import { Image } from '@Utils/types/image.type';
import { CategoryService } from '@services/category.service';
import { Category } from '@Utils/types/category.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  public isEdit = false;
  public form!: FormGroup;
  public files: File[] = [];
  public editItem!: Product;
  public loading: boolean = false;
  public categories$!: Observable<Category[]>;

  constructor(
    public modalRef: BsModalRef,
    private service: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getMapped();
  }

  edit(): void {
    const product: Product = {
      ...this.form.value,
      image: this.editItem?.image as Image,
    };
    this.service.update(this.editItem?.id as string, product).subscribe(
      () => {
        ToastClass.successToast('Product edited successfully');
        this.form.reset();
        this.modalRef.hide();
      },
      (error) => {
        ToastClass.errorToast(error.message);
      }
    );
  }

  create(): void {
    const file = this.files[0];
    const product: Product = {
      ...this.form.value,
      image: { name: file.name, url: '' },
    };
    this.service.create(product, file).subscribe(
      () => {
        ToastClass.successToast('Product created successfully');
        this.files = [];
        this.form.reset();
        this.modalRef.hide();
      },
      (error) => {
        ToastClass.errorToast(error.message);
      }
    );
  }

  onSelect(event: any): void {
    let reader = new FileReader();
    this.files.push(...event.addedFiles);
    reader.readAsDataURL(event.addedFiles[0]);
    reader.onload = () => {
      this.form.patchValue({
        image: reader.result,
      });
    };
  }

  onRemove(event: any): void {
    this.files.splice(this.files.indexOf(event), 1);
    this.form.patchValue({
      image: null,
    });
  }

  validation(): void {
    if (this.form.valid) {
      this.loading = true;
      if (this.isEdit) this.edit();
      else this.create();
    }
  }
}
