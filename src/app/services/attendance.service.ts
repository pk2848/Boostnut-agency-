import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

export interface AttendanceRecord {
  date: string;
  time: string;
  uid: string;
  name: string;
  isLate?: boolean;
}

// Replace with your Google Sheet ID (the value between /d/ and /edit in the sheet URL).
// The sheet must be shared publicly (Viewer access) for opensheet to work.
// Consider moving this to an Angular environment file for production deployments.
const DEFAULT_SHEET_ID = '1yiJ4HgXq105bVZPMaDyJzUo1YJ4rEhp8nW06';
const DEFAULT_SHEET_NAME = 'RFID_Attendance';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  // Late threshold: attendance at or after 09:00 is considered late (i.e. hour >= 9 means ≥ 09:00:00)
  private readonly LATE_HOUR = 9;

  private sheetId = DEFAULT_SHEET_ID;
  private sheetName = DEFAULT_SHEET_NAME;

  // Use opensheet proxy to fetch data from Google Sheets as JSON
  private get apiUrl(): string {
    return `https://opensheet.elk.sh/${this.sheetId}/${this.sheetName}`;
  }

  constructor(private http: HttpClient) {}

  configure(sheetId: string, sheetName: string) {
    this.sheetId = sheetId;
    this.sheetName = sheetName;
  }

  fetchRecords(): Observable<AttendanceRecord[]> {
    return this.http.get<Record<string, string>[]>(this.apiUrl).pipe(
      map(rows => this.normalizeRows(rows)),
      catchError(() => of([] as AttendanceRecord[]))
    );
  }

  private normalizeRows(rows: Record<string, string>[]): AttendanceRecord[] {
    return rows.map(row => {
      // Support both title-case ("Date") and lower-case ("date") column headers
      const date = row['Date'] ?? row['date'] ?? '';
      const time = row['Time'] ?? row['time'] ?? '';
      const uid = (row['UID'] ?? row['uid'] ?? '').toUpperCase();
      const name = row['Name'] ?? row['name'] ?? 'Unknown';

      const isLate = this.checkLate(time);
      return { date, time, uid, name, isLate };
    });
  }

  private checkLate(timeStr: string): boolean {
    if (!timeStr) return false;
    const parts = timeStr.split(':');
    if (parts.length < 1) return false;
    const hour = parseInt(parts[0], 10);
    return hour >= this.LATE_HOUR;
  }

  getUniqueStudents(records: AttendanceRecord[]): string[] {
    return [...new Set(records.map(r => r.name))].sort();
  }

  getAttendanceByDate(records: AttendanceRecord[]): Map<string, number> {
    const map = new Map<string, number>();
    for (const r of records) {
      map.set(r.date, (map.get(r.date) ?? 0) + 1);
    }
    return map;
  }

  exportToCsv(records: AttendanceRecord[]): void {
    const header = 'Date,Time,UID,Name,Late';
    const rows = records.map(
      r => `${r.date},${r.time},${r.uid},"${r.name}",${r.isLate ? 'Yes' : 'No'}`
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
