// src/app/components/generic-table/generic-table.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TableColumn, TableConfig } from '../../interfaces/table-config.interface';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit, OnChanges {
  @Input() config!: TableConfig;
  @Output() actionClicked = new EventEmitter<{action: string, row: any}>();
  @Output() columnVisibilityChanged = new EventEmitter<TableColumn[]>();

  // Internal state
  filteredData: any[] = [];
  paginatedData: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  // Column visibility
  visibleColumns: TableColumn[] = [];
  availableColumns: TableColumn[] = [];

  ngOnInit() {
    this.initializeTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config']) {
      this.initializeTable();
    }
  }

  private initializeTable() {
    if (!this.config) return;

    // Initialize all columns as visible by default if not specified
    this.availableColumns = this.config.columns.map(col => ({
      ...col,
      visible: col.visible !== false  // Set visible to true if not explicitly false
    }));
    
    this.visibleColumns = this.availableColumns.filter(col => col.visible === true);
    this.filteredData = [...this.config.data];
    
    // Set default sorting
    if (this.config.sorting && this.config.sorting.enabled && this.config.sorting.defaultColumn) {
      this.sortColumn = this.config.sorting.defaultColumn;
      this.sortDirection = this.config.sorting.defaultDirection || 'asc';
      this.sortData();
    }
    
    this.updatePagination();
  }

  // Search functionality
  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.toLowerCase();
    this.filterData();
  }

  private filterData() {
    if (!this.searchTerm) {
      this.filteredData = [...this.config.data];
    } else {
      this.filteredData = this.config.data.filter(row => {
        return this.visibleColumns.some(col => {
          const value = row[col.key];
          if (value === null || value === undefined) return false;
          return value.toString().toLowerCase().includes(this.searchTerm);
        });
      });
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  // Sorting functionality
  onSort(column: TableColumn) {
    if (!column.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }
    
    this.sortData();
  }

  private sortData() {
    this.filteredData.sort((a, b) => {
      const aValue = a[this.sortColumn];
      const bValue = b[this.sortColumn];
      
      let comparison = 0;
      
      if (aValue < bValue) comparison = -1;
      else if (aValue > bValue) comparison = 1;
      
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
    
    this.updatePagination();
  }

  // Pagination functionality
  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  onPageSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const pageSize = parseInt(target.value);
    if (this.config.pagination) {
      this.config.pagination.pageSize = pageSize;
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  private updatePagination() {
    if (!this.config.pagination || !this.config.pagination.enabled) {
      this.paginatedData = this.filteredData;
      return;
    }

    const pageSize = this.config.pagination.pageSize;
    const startIndex = (this.currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredData.length / pageSize);
  }

  // Column visibility
  toggleColumnVisibility(column: TableColumn) {
    // Toggle the visible property
    column.visible = !column.visible;
    
    // Update visible columns array
    this.visibleColumns = this.availableColumns.filter(col => col.visible === true);
    
    // Emit the change
    this.columnVisibilityChanged.emit(this.visibleColumns);
    
    // Re-filter data to ensure search works with new visible columns
    this.filterData();
  }

  // Action handling
  onAction(action: string, row: any) {
    this.actionClicked.emit({ action, row });
  }

  // Utility methods
  getSortIcon(column: TableColumn): string {
    if (!column.sortable || this.sortColumn !== column.key) return '';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  getPageNumbers(): number[] {
    const pages = [];
    const maxVisible = 5;
    const start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(this.totalPages, start + maxVisible - 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  formatCellValue(value: any, column: TableColumn): string {
    if (value === null || value === undefined) return '';
    
    switch (column.type) {
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'boolean':
        return value ? 'Yes' : 'No';
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      default:
        return value.toString();
    }
  }

  // Add this method to fix the Math.min issue in template
  getMinValue(a: number, b: number): number {
    return Math.min(a, b);
  }
}