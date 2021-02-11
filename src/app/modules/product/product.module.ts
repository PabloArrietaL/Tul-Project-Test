import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from '@Smarts/product/product.component';
import { ProductFormComponent } from '@Smarts/product-form/product-form.component';
import { SharedModule } from '@Modules/shared/shared.module';

@NgModule({
  declarations: [ProductComponent, ProductFormComponent],
  imports: [CommonModule, ProductRoutingModule, SharedModule],
})
export class ProductModule {}
