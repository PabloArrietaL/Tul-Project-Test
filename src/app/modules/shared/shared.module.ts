import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@Dummies/pagination/pagination.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, NgxDropzoneModule],
  exports: [PaginationComponent, NgxDropzoneModule],
})
export class SharedModule {}
