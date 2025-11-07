import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

export interface ColumnConfig {
  key: string;
  title: string;
  visible?: boolean;
  sortable?: boolean;
  width?: string;
}

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent<T> implements OnChanges {
  @Input() data: T[] = [];
  @Input() columns: ColumnConfig[] = [];
  @Input() pageSize: number = 10;
  @Input() searchTerm: string = '';
  @Input() showColumnSelector: boolean = true;
  
  @Output() sortChanged = new EventEmitter<SortEvent>();
  @Output() rowClicked = new EventEmitter<T>();

  filteredData: T[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['searchTerm'] || changes['columns']) {
      this.applyFilterAndPagination();
    }
  }

  applyFilterAndPagination(): void {
    // Apply search filter
    this.filteredData = this.data.filter(item => 
      JSON.stringify(item).toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Calculate total pages
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    
    // Reset to first page if current page exceeds total pages
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
    
    // Apply pagination
    this.filteredData = this.filteredData.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }

  get visibleColumns(): ColumnConfig[] {
    return this.columns.filter(column => column.visible !== false);
  }

  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    this.sortChanged.emit({
      column: this.sortColumn,
      direction: this.sortDirection
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilterAndPagination();
  }

  onRowClick(item: T): void {
    this.rowClicked.emit(item);
  }

  toggleColumnVisibility(column: ColumnConfig): void {
    column.visible = !column.visible;
    this.applyFilterAndPagination();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5; // Show up to 5 page numbers
    
    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      let end = Math.min(this.totalPages, start + maxVisiblePages - 1);
      
      if (end - start + 1 < maxVisiblePages) {
        start = end - maxVisiblePages + 1;
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }
}