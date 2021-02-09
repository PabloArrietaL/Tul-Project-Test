import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserForm } from '@Utils/form/user.form';
import { Login } from '@Utils/types/user.type';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public form: FormGroup = UserForm.initForm();
  @Output() emitRegister = new EventEmitter<Login>();

  constructor() {}

  ngOnInit(): void {}

  register(): void {
    if (this.form.valid) {
      this.emitRegister.emit(this.form.value);
    }
  }
}
