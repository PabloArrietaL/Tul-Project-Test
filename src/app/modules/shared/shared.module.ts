import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@Dummies/pagination/pagination.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, NgxDropzoneModule, FormsModule, ReactiveFormsModule],
  exports: [
    PaginationComponent,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
