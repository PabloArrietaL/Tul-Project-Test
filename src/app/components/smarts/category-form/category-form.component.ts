import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryService } from '@services/category.service';
import { Category } from '@Utils/types/category.type';
import { ToastClass } from '@Utils/class/toast.class';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Image } from '@Utils/types/image.type';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  public isEdit = false;
  public form!: FormGroup;
  public files: File[] = [];
  public editItem!: Category;
  public loading: boolean = false;

  constructor(public modalRef: BsModalRef, private service: CategoryService) {}

  ngOnInit(): void {}

  edit(): void {
    const category: Category = {
      name: this.form.controls.name.value,
      image: this.editItem?.image as Image,
    };
    this.service.update(this.editItem?.id as string, category).subscribe(
      () => {
        ToastClass.successToast('Category edited successfully');
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
    const category = {
      name: this.form.controls.name.value,
      image: { name: file.name, url: '' },
    };
    this.service.create(category, file).subscribe(
      () => {
        ToastClass.successToast('Category created successfully');
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
