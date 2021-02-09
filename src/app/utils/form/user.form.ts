import { FormGroup, FormControl, Validators } from '@angular/forms';

export class UserForm {
  public static initForm() {
    return new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.nullValidator],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.nullValidator],
      }),
    });
  }
}
