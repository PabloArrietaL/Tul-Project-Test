import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import paginate from 'jw-paginate';

@Component({
  selector: 'app-pagination',
  styleUrls: ['./pagination.component.scss'],
  template: `<ul *ngIf="pager.pages && pager.pages.length" class="pagination">
    <li
      [ngClass]="{ disabled: pager.currentPage === 1 }"
      class="page-item first-item"
    >
      <a (click)="setPage(1)" class="page-link">First</a>
    </li>
    <li
      [ngClass]="{ disabled: pager.currentPage === 1 }"
      class="page-item previous-item"
    >
      <a (click)="setPage(pager.currentPage - 1)" class="page-link">Previous</a>
    </li>
    <li
      *ngFor="let page of pager.pages"
      [ngClass]="{ active: pager.currentPage === page }"
      class="page-item number-item"
    >
      <a (click)="setPage(page)" class="page-link">{{ page }}</a>
    </li>
    <li
      [ngClass]="{ disabled: pager.currentPage === pager.totalPages }"
      class="page-item next-item"
    >
      <a (click)="setPage(pager.currentPage + 1)" class="page-link">Next</a>
    </li>
    <li
      [ngClass]="{ disabled: pager.currentPage === pager.totalPages }"
      class="page-item last-item"
    >
      <a (click)="setPage(pager.totalPages)" class="page-link">Last</a>
    </li>
  </ul>`,
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() items!: Array<any>;
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 5;
  @Input() maxPages = 10;

  public pager: any = {};

  constructor() {}

  ngOnInit(): void {
    if (this.items && this.items.length) {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items.currentValue !== changes.items.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  setPage(page: number): void {
    this.pager = paginate(
      this.items.length,
      page,
      this.pageSize,
      this.maxPages
    );
    const pageOfItems = this.items.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    this.changePage.emit(pageOfItems);
  }
}
