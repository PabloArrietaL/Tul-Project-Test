import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ToastClass {
  public static errorToast(message: string, title?: string): void {
    Swal.fire({
      title: title ?? 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
      heightAuto: false,
    });
  }
  public static successToast(message: string, title?: string): void {
    Swal.fire({
      title: title ?? 'Success!',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
      heightAuto: false,
    });
  }
}
