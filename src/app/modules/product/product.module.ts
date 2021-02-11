import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from '@Smarts/product/product.component';
import { ProductFormComponent } from '@Smarts/product-form/product-form.component';

@NgModule({
  declarations: [ProductComponent, ProductFormComponent],
  imports: [CommonModule, ProductRoutingModule],
})
export class ProductModule {}
