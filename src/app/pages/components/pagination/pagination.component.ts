import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;

  private _currentPage: number = 1;

  @Input()
  get currentPage(): number {
    return this._currentPage;
  }
  set currentPage(value: number) {
    this._currentPage = value;
    this.currentPageChange.emit(this._currentPage);
  }

  @Output() currentPageChange = new EventEmitter<number>();
  @Output() pageChanged = new EventEmitter<number>();

  get totalPages(): number {    
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePage(page: number)  {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page; // triggers both currentPageChange & pageChanged
      this.pageChanged.emit(page);
    }
  }

  nextPage(){
    this.changePage(this.currentPage + 1);
  }

  prevPage() {
    this.changePage(this.currentPage - 1);
  }
}
