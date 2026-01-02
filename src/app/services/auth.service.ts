import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserKey = 'currentUser';
  private usersKey = 'users';

  constructor() {}

  // Mendaftarkan user baru
  register(username: string, pass: string): boolean {
    const users = this.getUsers();

    // Cek apakah username sudah ada
    if (users.some((u: any) => u.username === username)) {
      return false;
    }

    // Tambah user baru (default role: user)
    const newUser = { username, password: pass, role: 'user' };
    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  // Melakukan login
  login(username: string, pass: string): boolean {
    const users = this.getUsers();

    // Cari user yang cocok
    const user = users.find((u: any) => u.username === username && u.password === pass);

    if (user) {
      // Simpan sesi login
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  // Logout
  logout() {
    localStorage.removeItem(this.currentUserKey);
  }

  // Ambil data user yang sedang login
  getCurrentUser() {
    const userStr = localStorage.getItem(this.currentUserKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  // Helper: Ambil semua user terdaftar (untuk debug/cek)
  getUsers() {
    const usersStr = localStorage.getItem(this.usersKey);
    return usersStr ? JSON.parse(usersStr) : [];
  }
}
