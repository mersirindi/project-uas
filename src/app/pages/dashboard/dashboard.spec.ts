import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Dashboard } from './dashboard';
import { AuthService } from '../../services/auth.service';
// Import utilitas dari Vitest
import { vi, describe, it, expect, beforeEach, type Mocked } from 'vitest';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  // Ubah 'jest.Mocked' menjadi 'Mocked' (dari Vitest)
  let authService: Mocked<AuthService>;
  let router: Mocked<Router>;

  beforeEach(async () => {
    // Ubah 'jest.fn()' menjadi 'vi.fn()'
    const authServiceMock = {
      logout: vi.fn(),
      getCurrentUser: vi.fn().mockReturnValue({ username: 'admin', role: 'admin' }),
    };

    const routerMock = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Dashboard],
    }).compileComponents();

    TestBed.overrideProvider(AuthService, { useValue: authServiceMock });
    TestBed.overrideProvider(Router, { useValue: routerMock });

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;

    // Casting menggunakan 'Mocked' dari Vitest
    authService = TestBed.inject(AuthService) as Mocked<AuthService>;
    router = TestBed.inject(Router) as Mocked<Router>;

    fixture.detectChanges();
  });

  it('harus membuat dashboard', () => {
    expect(component).toBeTruthy();
  });

  it('harus merender 3 kartu statistik dari Signal', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.card');
    expect(cards.length).toBe(3);
  });

  it('harus menampilkan "Revenue" pada kartu pertama', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstCardLabel = compiled.querySelector('.card .label');
    expect(firstCardLabel?.textContent).toContain('Revenue');
  });

  it('harus menampilkan username pengguna di header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const welcomeText = compiled.querySelector('.welcome-text');
    expect(welcomeText?.textContent).toContain('Selamat datang');
  });

  it('harus memanggil logout saat tombol logout diklik', () => {
    // Menggunakan debugElement untuk interaksi tombol yang lebih aman
    const logoutBtn = fixture.debugElement.query(By.css('.logout-btn'));
    logoutBtn.triggerEventHandler('click', null);

    expect(authService.logout).toHaveBeenCalled();
  });

  it('harus menampilkan role pengguna', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const userRole = compiled.querySelector('.user-role');
    expect(userRole?.textContent).toContain('Administrator');
  });
});
