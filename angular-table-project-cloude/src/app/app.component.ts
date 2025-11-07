// src/app/app.component.ts
import { Component } from '@angular/core';
import { TableConfig } from './interfaces/table-config.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Sample data
  employees = [
    { id: 1, name: 'John Doe', email: 'john@example.com', department: 'IT', salary: 50000, joinDate: '2020-01-15', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'HR', salary: 45000, joinDate: '2019-06-10', active: true },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', department: 'Finance', salary: 55000, joinDate: '2021-03-20', active: false },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', department: 'IT', salary: 48000, joinDate: '2020-11-05', active: true },
    { id: 5, name: 'David Brown', email: 'david@example.com', department: 'Marketing', salary: 42000, joinDate: '2018-09-12', active: true }
  ];

  // Table configuration
  tableConfig: TableConfig = {
    columns: [
      { key: 'id', header: 'ID', sortable: true, type: 'number', width: '80px' },
      { key: 'name', header: 'Full Name', sortable: true, type: 'text' },
      { key: 'email', header: 'Email Address', sortable: true, type: 'text' },
      { key: 'department', header: 'Department', sortable: true, type: 'text' },
      { key: 'salary', header: 'Salary', sortable: true, type: 'number' },
      { key: 'joinDate', header: 'Join Date', sortable: true, type: 'date' },
      { key: 'active', header: 'Active', sortable: true, type: 'boolean', width: '100px' }
    ],
    data: this.employees,
    pagination: {
      enabled: true,
      pageSize: 3,
      pageSizeOptions: [3, 5, 10, 20]
    },
    sorting: {
      enabled: true,
      defaultColumn: 'name',
      defaultDirection: 'asc'
    },
    searching: {
      enabled: true,
      placeholder: 'Search employees...'
    },
    actions: {
      view: true,
      edit: true,
      delete: true,
      custom: [
        { label: 'Archive', action: 'archive', icon: '📁' }
      ]
    }
  };

  // Handle table actions
  onTableAction(event: {action: string, row: any}) {
    console.log('Action:', event.action, 'Row:', event.row);
    
    switch(event.action) {
      case 'view':
        alert(`Viewing ${event.row.name}`);
        break;
      case 'edit':
        alert(`Editing ${event.row.name}`);
        break;
      case 'delete':
        if(confirm(`Delete ${event.row.name}?`)) {
          this.employees = this.employees.filter(emp => emp.id !== event.row.id);
          this.tableConfig.data = this.employees;
        }
        break;
      case 'archive':
        alert(`Archiving ${event.row.name}`);
        break;
    }
  }

  // Handle column visibility changes
  onColumnVisibilityChanged(visibleColumns: any[]) {
    console.log('Visible columns changed:', visibleColumns);
  }
}