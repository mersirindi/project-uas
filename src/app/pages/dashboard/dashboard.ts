import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'], // Sesuaikan jika Anda pakai .scss
})
export class Dashboard implements OnInit {
  // Data Signal untuk Statistik & Aktivitas
  stats = signal([
    { label: 'Revenue', value: '$24,500', color: 'blue' },
    { label: 'Orders', value: '450', color: 'green' },
    { label: 'Visitors', value: '12,000', color: 'orange' },
  ]);

  activities = signal([
    { id: 1, task: 'Server Update', time: '2 mins ago', status: 'Done' },
    { id: 2, task: 'New User Registered', time: '1 hour ago', status: 'Process' },
    { id: 3, task: 'Database Backup', time: '5 hours ago', status: 'Done' },
  ]);

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Cek apakah user sudah login
    if (!this.authService.getCurrentUser()) {
      // Jika belum, tendang ke login
      this.router.navigate(['/login']);
    }
  }

  // Method yang dipanggil di HTML: {{ getCurrentUser()?.username }}
  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  // Method yang dipanggil di HTML: (click)="logout()"
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
