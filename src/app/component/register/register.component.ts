// src/app/component/register/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'], // Pastikan ekstensi css/scss sesuai
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordStrengthWidth: string = '0%';

  constructor(private router: Router, private authService: AuthService) {}

  // Dipanggil saat user mengetik password
  onPasswordInput() {
    this.calculatePasswordStrength();
  }

  // Logika menghitung persentase kekuatan password
  calculatePasswordStrength() {
    if (!this.password) {
      this.passwordStrengthWidth = '0%';
      return;
    }

    let strength = 0;
    // Panjang password
    if (this.password.length >= 8) strength += 40;
    else if (this.password.length >= 5) strength += 20;

    // Angka
    if (/\d/.test(this.password)) strength += 20;

    // Huruf besar dan kecil
    if (/[a-z]/.test(this.password) && /[A-Z]/.test(this.password)) strength += 20;

    this.passwordStrengthWidth = `${strength}%`;
  }

  // --- FUNGSI YANG HILANG (MEMPERBAIKI ERROR) ---

  // Error: Property 'getPasswordStrength' does not exist
  getPasswordStrength(): string {
    const width = parseInt(this.passwordStrengthWidth);
    if (width >= 70) return 'strong';
    if (width >= 40) return 'medium';
    return 'weak';
  }

  // (Opsional) Helper jika HTML memanggil ini juga
  getPasswordStrengthText(): string {
    const width = parseInt(this.passwordStrengthWidth);
    if (width >= 70) return 'Kuat';
    if (width >= 40) return 'Sedang';
    return 'Lemah';
  }

  // Error: Property 'getPasswordMatchClass' does not exist
  getPasswordMatchClass(): string {
    if (!this.confirmPassword) return '';
    return this.password === this.confirmPassword ? 'match' : 'mismatch';
  }

  // Error: Property 'getPasswordMatchText' does not exist
  getPasswordMatchText(): string {
    if (!this.confirmPassword) return '';
    return this.password === this.confirmPassword ? 'Password cocok' : 'Password tidak cocok';
  }

  // Error: Property 'isFormValid' does not exist
  isFormValid(): boolean {
    return (
      this.username.trim() !== '' &&
      this.password.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      this.password === this.confirmPassword &&
      parseInt(this.passwordStrengthWidth) >= 40 // Minimal kekuatan 'Sedang'
    );
  }

  // --- END FUNGSI YANG HILANG ---

  register(event?: Event) {
    if (event) event.preventDefault();

    if (!this.isFormValid()) {
      return;
    }

    const success = this.authService.register(this.username, this.password);

    if (success) {
      alert('Registrasi berhasil! Silakan login.');
      this.router.navigate(['/login']);
    } else {
      alert('Username sudah digunakan! Gunakan username lain.');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
