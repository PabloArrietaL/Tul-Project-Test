import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '@Smarts/auth/auth.component';
import { SignInComponent } from '@Dummies/sign-in/sign-in.component';
import { SignUpComponent } from '@Dummies/sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '@services/authentication.service';

@NgModule({
  declarations: [AuthComponent, SignInComponent, SignUpComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [AuthenticationService],
})
export class AuthModule {}
