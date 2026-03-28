import { Injectable, signal } from '@angular/core';

export type UserRole = 'admin' | 'student';

export interface AuthUser {
  role: UserRole;
  name: string;
  uid?: string; // for student role
}

const STORAGE_KEY = 'erp_auth';

// Demo credentials – replace with a proper backend auth service in production.
// These are intentionally visible as this is a client-side demo only.
const ADMIN_CREDENTIALS = { username: 'admin', password: 'admin123' };
const STUDENT_CARDS: Record<string, string> = {
  B3EA6756: 'Prashant',
  B383F15: 'Karan Aujla',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<AuthUser | null>(this.loadFromStorage());

  get user() {
    return this._user.asReadonly();
  }

  get isLoggedIn(): boolean {
    return this._user() !== null;
  }

  get isAdmin(): boolean {
    return this._user()?.role === 'admin';
  }

  loginAdmin(username: string, password: string): boolean {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const user: AuthUser = { role: 'admin', name: 'Administrator' };
      this._user.set(user);
      this.saveToStorage(user);
      return true;
    }
    return false;
  }

  loginStudent(uid: string): boolean {
    const normalized = uid.toUpperCase().replace(/\s/g, '');
    const name = STUDENT_CARDS[normalized];
    if (name) {
      const user: AuthUser = { role: 'student', name, uid: normalized };
      this._user.set(user);
      this.saveToStorage(user);
      return true;
    }
    return false;
  }

  logout(): void {
    this._user.set(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  private saveToStorage(user: AuthUser): void {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  private loadFromStorage(): AuthUser | null {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }
}
