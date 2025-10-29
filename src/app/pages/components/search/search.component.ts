import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchText: string = '';
  filterDate: string = '';

  // Emit both filters together
  @Output() filtersChanged = new EventEmitter<{ searchText: string; filterDate: string }>();

  applyFilters() {
    this.filtersChanged.emit({
      searchText: this.searchText.trim(),
      filterDate: this.filterDate
    });
  }
}
