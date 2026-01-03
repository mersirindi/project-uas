import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { vi, describe, it, expect, beforeEach, type Mocked } from 'vitest';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: Mocked<AuthService>;
  let router: Mocked<Router>;

  beforeEach(async () => {
    const authServiceMock = {
      login: vi.fn(),
    };

    const routerMock = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule],
    }).compileComponents();

    TestBed.overrideProvider(AuthService, { useValue: authServiceMock });
    TestBed.overrideProvider(Router, { useValue: routerMock });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService) as Mocked<AuthService>;
    router = TestBed.inject(Router) as Mocked<Router>;

    fixture.detectChanges();
  });

  it('harus membuat komponen login', () => {
    expect(component).toBeTruthy();
  });

  it('harus memanggil authService.login() jika form valid', () => {
    authService.login.mockReturnValue(true);

    component.username = 'tom';
    component.password = '12345';

    component.login();

    expect(authService.login).toHaveBeenCalledWith('tom', '12345');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('harus menampilkan alert jika login gagal', () => {
    // Mock window.alert dengan vi.spyOn
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    authService.login.mockReturnValue(false);

    component.username = 'salah';
    component.password = 'salah';

    component.login();

    expect(router.navigate).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });

  it('harus pindah ke halaman register', () => {
    component.goToRegister();
    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });
});
