import { Component, OnInit } from '@angular/core';
import { Product } from '@Utils/types/product.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public products: Product[] = [];

  constructor() {}

  ngOnInit(): void {}
}
