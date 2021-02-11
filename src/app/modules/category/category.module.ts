import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from '@Smarts/category/category.component';
import { SharedModule } from '@Modules/shared/shared.module';
import { CategoryFormComponent } from '@Smarts/category-form/category-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoryComponent, CategoryFormComponent],
  entryComponents: [CategoryFormComponent],
  imports: [CommonModule, CategoryRoutingModule, SharedModule],
})
export class CategoryModule {}
