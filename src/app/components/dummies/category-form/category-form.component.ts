import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryFile } from '@Utils/types/category.type';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnChanges {
  @Input() isEdit = false;
  @Output() emitForm = new EventEmitter<CategoryFile>();
  @Input() form!: FormGroup;
  @Input() files!: File[];
  public loading: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.files?.currentValue?.length == 0 &&
      changes.files?.previousValue?.length > 0
    ) {
      this.loading = false;
    }

    if (!changes.isEdit.currentValue) {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  closeModal() {
    this.isEdit = false;
    this.form.reset();
  }

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
      this.loading = true;
      this.emitForm.emit({ ...this.form.value, file: this.files[0] });
    }
  }
}
