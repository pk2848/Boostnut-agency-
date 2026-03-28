import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { AttendanceRecord, AttendanceService } from '../../../services/attendance.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private sub?: Subscription;

  allRecords = signal<AttendanceRecord[]>([]);
  loading = signal(true);
  lastRefreshed = signal<Date | null>(null);

  searchQuery = '';
  filterDate = '';

  // Auto-refresh every 5 seconds
  private readonly REFRESH_INTERVAL_MS = 5000;

  constructor(
    private attendanceService: AttendanceService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = interval(this.REFRESH_INTERVAL_MS)
      .pipe(
        startWith(0),
        switchMap(() => this.attendanceService.fetchRecords())
      )
      .subscribe(records => {
        this.allRecords.set(records);
        this.loading.set(false);
        this.lastRefreshed.set(new Date());
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  get filteredRecords(): AttendanceRecord[] {
    const q = this.searchQuery.toLowerCase().trim();
    const d = this.filterDate;
    return this.allRecords().filter(r => {
      const matchQ = !q || r.name.toLowerCase().includes(q) || r.uid.toLowerCase().includes(q);
      const matchD = !d || r.date === d;
      return matchQ && matchD;
    });
  }

  get totalToday(): number {
    const today = new Date().toISOString().slice(0, 10);
    return this.allRecords().filter(r => r.date === today).length;
  }

  get totalPresent(): number {
    return this.filteredRecords.length;
  }

  get lateCount(): number {
    return this.filteredRecords.filter(r => r.isLate).length;
  }

  get uniqueStudents(): number {
    return new Set(this.allRecords().map(r => r.uid)).size;
  }

  // Bar chart: attendance per date (last 7 dates)
  get chartData(): { date: string; count: number; pct: number }[] {
    const map = this.attendanceService.getAttendanceByDate(this.allRecords());
    const entries = [...map.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-7);
    const max = Math.max(...entries.map(e => e[1]), 1);
    return entries.map(([date, count]) => ({
      date: date.slice(5), // MM-DD
      count,
      pct: Math.round((count / max) * 100),
    }));
  }

  clearFilters() {
    this.searchQuery = '';
    this.filterDate = '';
  }

  exportCsv() {
    this.attendanceService.exportToCsv(this.filteredRecords);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/erp/login']);
  }

  get userName(): string {
    return this.auth.user()?.name ?? 'Admin';
  }
}
