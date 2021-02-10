import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryForm } from '@Utils/form/category.form';
import { Category } from '@Utils/types/category.type';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  @Input() isEdit = false;
  @Output() emitForm = new EventEmitter<Category>();
  public form: FormGroup = CategoryForm.initForm();
  public files: File[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onSelect(event: any): void {
    let reader = new FileReader();
    this.files.push(...event.addedFiles);
    reader.readAsDataURL(event.addedFiles[0]);
    reader.onload = () => {
      this.form.patchValue({
        image: reader.result,
      });

      this.cdr.markForCheck();
    };
  }

  onRemove(event: any): void {
    this.files.splice(this.files.indexOf(event), 1);
    this.form.patchValue({
      image: null,
    });
  }

  emitValidation(): void {
    if (this.form.valid) {
      this.emitForm.emit(this.form.value);
    }
  }
}
