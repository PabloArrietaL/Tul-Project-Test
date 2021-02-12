import { Component } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  constructor(private service: AuthenticationService) {}

  logout(logout: boolean) {
    if (logout) this.service.signOut();
  }
}
