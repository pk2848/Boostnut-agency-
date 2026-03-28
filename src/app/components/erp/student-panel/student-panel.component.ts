import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { AttendanceRecord, AttendanceService } from '../../../services/attendance.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-student-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-panel.component.html',
  styleUrl: './student-panel.component.css',
})
export class StudentPanelComponent implements OnInit, OnDestroy {
  private sub?: Subscription;

  allRecords = signal<AttendanceRecord[]>([]);
  loading = signal(true);
  lastRefreshed = signal<Date | null>(null);

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

  get studentUid(): string {
    return this.auth.user()?.uid ?? '';
  }

  get studentName(): string {
    return this.auth.user()?.name ?? 'Student';
  }

  get myRecords(): AttendanceRecord[] {
    return this.allRecords().filter(r => r.uid === this.studentUid);
  }

  get presentDays(): number {
    return new Set(this.myRecords.map(r => r.date)).size;
  }

  get lateCount(): number {
    return this.myRecords.filter(r => r.isLate).length;
  }

  get onTimeCount(): number {
    return this.myRecords.filter(r => !r.isLate).length;
  }

  get lastSeen(): string {
    if (!this.myRecords.length) return 'N/A';
    const sorted = [...this.myRecords].sort((a, b) =>
      (b.date + b.time).localeCompare(a.date + a.time)
    );
    return `${sorted[0].date} ${sorted[0].time}`;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/erp/login']);
  }
}
