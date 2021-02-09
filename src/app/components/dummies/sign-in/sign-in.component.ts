import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserForm } from '@Utils/form/user.form';
import { Login } from '@Utils/types/user.type';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public form: FormGroup = UserForm.initForm();
  @Output() emitLogin = new EventEmitter<Login>();

  constructor() {}

  ngOnInit(): void {}

  login(): void {
    if (this.form.valid) {
      this.emitLogin.emit(this.form.value);
    }
  }
}
