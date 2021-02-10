import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@services/category.service';
import { ToastClass } from '@Utils/class/toast.class';
import { Category } from '@Utils/types/category.type';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public isEdit = false;
  pageOfItems!: Array<any>;
  items = [
    {
      name: 'Pablo',
      image: 'image',
    },
    {
      name: 'Pablo',
      image: 'image',
    },
    {
      name: 'Pablo',
      image: 'image',
    },
    {
      name: 'Pablo',
      image: 'image',
    },
    {
      name: 'Pablo',
      image: 'image',
    },
    {
      name: 'Pablo',
      image: 'image',
    },
    {
      name: 'Pablo',
      image: 'image',
    },
    {
      name: 'Pablo',
      image: 'image',
    },
    {
      name: 'Pablo',
      image: 'image',
    },
  ];

  constructor(private service: CategoryService) {}

  ngOnInit(): void {}

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  sendToFirebase(category: Category): void {
    this.service.create(category).subscribe(
      () => {
        ToastClass.successToast('Category created successfully');
      },
      (error) => {
        ToastClass.errorToast(error.message);
      }
    );
  }
}
