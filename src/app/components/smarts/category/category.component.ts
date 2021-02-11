import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryFormComponent } from '@Smarts/category-form/category-form.component';
import { CategoryService } from '@services/category.service';
import { ToastClass } from '@Utils/class/toast.class';
import { CategoryForm } from '@Utils/form/category.form';
import { Category } from '@Utils/types/category.type';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public isEdit = false;
  public pageOfItems: Category[] = [];
  public items: Category[] = [];
  public modalRef!: BsModalRef;

  constructor(
    private service: CategoryService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.service.get().subscribe((data) => {
      const temp: Category[] = [];
      data.forEach((value) => {
        temp.push({
          ...(value.payload.doc.data() as Category),
          id: value.payload.doc.id,
        });
      });
      this.items = temp;
    });
  }

  onChangePage(pageOfItems: Array<Category>) {
    this.pageOfItems = pageOfItems;
  }

  delete(item: Category) {
    this.service.delete(item).subscribe(
      () => {
        ToastClass.successToast('Category deleted succesfully');
      },
      (error) => {
        ToastClass.errorToast(error.message);
      }
    );
  }

  openEdit(item: Category) {
    const form: FormGroup = CategoryForm.initForm();
    form.patchValue({
      name: item.name,
      image: item.image.url,
    });
    const initialState = {
      form,
      isEdit: true,
      editItem: item,
    };
    this.modalService.show(CategoryFormComponent, {
      class: 'modal-dialog-centered',
      initialState,
    });
  }

  openCreate() {
    const form: FormGroup = CategoryForm.initForm();
    const initialState = {
      form,
      isEdit: false,
    };
    this.modalService.show(CategoryFormComponent, {
      class: 'modal-dialog-centered',
      initialState,
    });
  }
}
