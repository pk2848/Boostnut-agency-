import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  tab = signal<'admin' | 'student'>('admin');
  adminUsername = '';
  adminPassword = '';
  studentUid = '';
  error = signal('');
  loading = signal(false);

  constructor(private auth: AuthService, private router: Router) {
    // Redirect if already logged in
    const user = this.auth.user();
    if (user) {
      this.router.navigate([user.role === 'admin' ? '/erp/admin' : '/erp/student']);
    }
  }

  switchTab(tab: 'admin' | 'student') {
    this.tab.set(tab);
    this.error.set('');
  }

  loginAdmin() {
    this.error.set('');
    this.loading.set(true);
    setTimeout(() => {
      const ok = this.auth.loginAdmin(this.adminUsername, this.adminPassword);
      this.loading.set(false);
      if (ok) {
        this.router.navigate(['/erp/admin']);
      } else {
        this.error.set('Invalid username or password.');
      }
    }, 300);
  }

  loginStudent() {
    this.error.set('');
    this.loading.set(true);
    setTimeout(() => {
      const ok = this.auth.loginStudent(this.studentUid);
      this.loading.set(false);
      if (ok) {
        this.router.navigate(['/erp/student']);
      } else {
        this.error.set('UID not found. Please check and try again.');
      }
    }, 300);
  }
}
