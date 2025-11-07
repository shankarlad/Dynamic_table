import { Component } from '@angular/core';
import { ColumnConfig } from '../shared/components/generic-table/generic-table.component';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  status: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', joinDate: '2020-01-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', joinDate: '2020-03-22', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', joinDate: '2020-05-10', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', joinDate: '2020-07-18', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', joinDate: '2020-09-30', status: 'Inactive' },
    { id: 6, name: 'Diana Miller', email: 'diana@example.com', role: 'Manager', joinDate: '2021-01-05', status: 'Active' },
    { id: 7, name: 'Evan Davis', email: 'evan@example.com', role: 'User', joinDate: '2021-02-14', status: 'Active' },
    { id: 8, name: 'Fiona Garcia', email: 'fiona@example.com', role: 'User', joinDate: '2021-04-20', status: 'Inactive' },
    { id: 9, name: 'George Martinez', email: 'george@example.com', role: 'Admin', joinDate: '2021-06-11', status: 'Active' },
    { id: 10, name: 'Hannah Robinson', email: 'hannah@example.com', role: 'User', joinDate: '2021-08-09', status: 'Active' },
  ];

  columns: ColumnConfig[] = [
    { key: 'id', title: 'ID', sortable: true, width: '80px' },
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    { key: 'role', title: 'Role', sortable: true },
    { key: 'joinDate', title: 'Join Date', sortable: true },
    { key: 'status', title: 'Status', sortable: true }
  ];

  searchTerm: string = '';
  pageSize: number = 5;

  onSort(event: any): void {
    const { column, direction } = event;
    this.users.sort((a: any, b: any) => {
      const aValue = a[column];
      const bValue = b[column];
      
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  onRowClick(user: User): void {
    console.log('Row clicked:', user);
    alert(`User selected: ${user.name} (${user.email})`);
  }
}