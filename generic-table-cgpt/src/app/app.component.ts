import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  sampleHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' }
  ];

  sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Sam Wilson', email: 'sam@example.com', role: 'Manager' },
    { id: 4, name: 'Anna Lee', email: 'anna@example.com', role: 'User' },
    { id: 5, name: 'Chris Paul', email: 'chris@example.com', role: 'Guest' },
    { id: 6, name: 'Rita Ora', email: 'rita@example.com', role: 'Editor' }
  ];
}
