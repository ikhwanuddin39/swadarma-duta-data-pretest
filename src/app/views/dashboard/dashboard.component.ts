import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  menus = [
    {
      name: 'Home',
      icon: 'home',
      link: '/dashboard/home'
    },
    {
      name: 'List Data',
      icon: 'info',
      link: '/dashboard/list-data'
    }
  ]
}
