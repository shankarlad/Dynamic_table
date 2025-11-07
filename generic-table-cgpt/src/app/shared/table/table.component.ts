import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() headers: { key: string, label: string }[] = [];

  visibleColumns: string[] = [];
  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  currentPage = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.visibleColumns = this.headers.map(h => h.key);
  }

  toggleColumn(key: string) {
    if (this.visibleColumns.includes(key)) {
      this.visibleColumns = this.visibleColumns.filter(col => col !== key);
    } else {
      this.visibleColumns.push(key);
    }
  }

  get sortedData() {
    let filtered = this.data;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(row =>
        Object.values(row).some(val => String(val).toLowerCase().includes(term))
      );
    }

    if (this.sortColumn) {
      filtered.sort((a, b) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];
        return (aValue > bValue ? 1 : -1) * (this.sortDirection === 'asc' ? 1 : -1);
      });
    }

    return filtered;
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.sortedData.slice(start, start + this.pageSize);
  }

  changeSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  totalPages() {
    return Math.ceil(this.sortedData.length / this.pageSize);
  }
}
