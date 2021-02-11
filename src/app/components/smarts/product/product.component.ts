import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductFormComponent } from '@Smarts/product-form/product-form.component';
import { ProductService } from '@services/product.service';
import { ToastClass } from '@Utils/class/toast.class';
import { ProductForm } from '@Utils/form/product.form';
import { Product } from '@Utils/types/product.type';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public isEdit = false;
  public pageOfItems: Product[] = [];
  public items: Product[] = [];
  public modalRef!: BsModalRef;

  constructor(
    private service: ProductService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.service.get().subscribe((data) => {
      const temp: Product[] = [];
      data.forEach((value) => {
        temp.push({
          ...(value.payload.doc.data() as Product),
          id: value.payload.doc.id,
        });
      });
      this.items = temp;
    });
  }

  onChangePage(pageOfItems: Array<Product>) {
    this.pageOfItems = pageOfItems;
  }

  delete(item: Product) {
    this.service.delete(item).subscribe(
      () => {
        ToastClass.successToast('Product deleted succesfully');
      },
      (error) => {
        ToastClass.errorToast(error.message);
      }
    );
  }

  openEdit(item: Product) {
    const form: FormGroup = ProductForm.initForm();
    form.patchValue({
      ...item,
      image: item.image.url,
    });
    const initialState = {
      form,
      isEdit: true,
      editItem: item,
    };
    this.modalService.show(ProductFormComponent, {
      class: 'modal-dialog-centered',
      initialState,
    });
  }

  openCreate() {
    const form: FormGroup = ProductForm.initForm();
    const initialState = {
      form,
      isEdit: false,
    };
    this.modalService.show(ProductFormComponent, {
      class: 'modal-dialog-centered',
      initialState,
    });
  }
}
