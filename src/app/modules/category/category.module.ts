import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from '@Smarts/category/category.component';

@NgModule({
  declarations: [CategoryComponent],
  imports: [CommonModule, CategoryRoutingModule],
})
export class CategoryModule {}
