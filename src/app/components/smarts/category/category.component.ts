import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryService } from '@services/category.service';
import { ToastClass } from '@Utils/class/toast.class';
import { CategoryForm } from '@Utils/form/category.form';
import { Category, CategoryFile } from '@Utils/types/category.type';
import { Image } from '@Utils/types/image.type';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public isEdit = false;
  public pageOfItems: Category[] = [];
  public items: Category[] = [];
  public form: FormGroup = CategoryForm.initForm();
  public files: File[] = [];
  public editItem!: Category | null;

  constructor(private service: CategoryService) {}

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

  onChangePage(pageOfItems: Array<any>) {
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
    this.isEdit = true;
    this.editItem = item;
    this.form.patchValue({
      name: item.name,
      image: item.image.url,
    });
  }

  sendToFirebase(categoryFile: CategoryFile): void {
    const file = categoryFile.file;
    const category = {
      name: categoryFile.name,
      image: this.isEdit
        ? (this.editItem?.image as Image)
        : { name: file.name, url: '' },
    };

    if (this.isEdit) {
      this.edit(category);
    } else {
      this.create(category, file);
    }
  }

  create(category: Category, file: File): void {
    this.service.create(category, file).subscribe(
      () => {
        ToastClass.successToast('Category created successfully');
        this.files = [];
        this.form.reset();
      },
      (error) => {
        ToastClass.errorToast(error.message);
      }
    );
  }

  edit(category: Category) {
    category.image = this.editItem?.image as Image;
    this.service.update(this.editItem?.id as string, category).subscribe(
      () => {
        ToastClass.successToast('Category edited successfully');
        this.isEdit = false;
        this.editItem = null;
        this.form.reset();
      },
      (error) => {
        ToastClass.errorToast(error.message);
      }
    );
  }
}
