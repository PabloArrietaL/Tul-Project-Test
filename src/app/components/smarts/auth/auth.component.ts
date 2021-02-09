import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';
import { Login } from '@Utils/types/user.type';
import { ToastClass } from '@Utils/class/toast.class';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private service: AuthenticationService, public router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) this.router.navigate(['home']);
  }

  login(form: Login): void {
    this.service.signIn(form).subscribe(
      () => {
        this.router.navigate(['home']);
      },
      (error) => {
        ToastClass.errorToast(error.message);
      }
    );
  }

  register(form: Login): void {
    this.service.signUp(form).subscribe(
      () => {
        ToastClass.successToast('User registered successfully');
        this.router.navigate(['home']);
      },
      () => {
        ToastClass.errorToast('An error has occurred');
      }
    );
  }
}
