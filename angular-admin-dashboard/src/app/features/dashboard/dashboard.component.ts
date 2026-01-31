import { Component, OnInit, inject, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../users/user.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private userService = inject(UserService);

  totalUsers = computed(() => this.userService.users().length);
  activeUsers = computed(() => this.userService.users().filter(u => u.status === 'Active').length);
  inactiveUsers = computed(() => this.userService.users().filter(u => u.status === 'Inactive').length);

  ngOnInit(): void {
    this.userService.load();
  }
}
