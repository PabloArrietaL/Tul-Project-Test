import { FormGroup, FormControl, Validators } from '@angular/forms';

export class CategoryForm {
  public static initForm() {
    return new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.nullValidator],
      }),
      image: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
      }),
    });
  }
}
