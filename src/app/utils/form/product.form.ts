import { FormGroup, FormControl, Validators } from '@angular/forms';

export class ProductForm {
  public static initForm() {
    return new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.nullValidator],
      }),
      description: new FormControl(''),
      price: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
      }),
      image: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
      }),
      categoryId: new FormControl('', {
        validators: [Validators.required, Validators.nullValidator],
      }),
    });
  }
}
