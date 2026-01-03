import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { vi, describe, it, expect, beforeEach, type Mocked } from 'vitest';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: Mocked<AuthService>;
  let router: Mocked<Router>;

  beforeEach(async () => {
    const authServiceMock = {
      register: vi.fn(),
    };

    const routerMock = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, FormsModule],
    }).compileComponents();

    TestBed.overrideProvider(AuthService, { useValue: authServiceMock });
    TestBed.overrideProvider(Router, { useValue: routerMock });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService) as Mocked<AuthService>;
    router = TestBed.inject(Router) as Mocked<Router>;

    fixture.detectChanges();
  });

  it('harus membuat komponen register', () => {
    expect(component).toBeTruthy();
  });

  it('harus menghitung kekuatan password', () => {
    component.password = '123';
    component.onPasswordInput();
    expect(component.getPasswordStrengthText()).toBe('Lemah');

    component.password = 'KuatBanget123';
    component.onPasswordInput();
    expect(component.getPasswordStrengthText()).toBe('Kuat');
  });

  it('harus gagal register jika password beda', () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    component.username = 'baru';
    component.password = 'Pass123';
    component.confirmPassword = 'Pass999';

    component.register();

    expect(authService.register).not.toHaveBeenCalled();
  });

  it('harus sukses register jika data valid', () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    authService.register.mockReturnValue(true);

    component.username = 'baru';
    component.password = 'Pass123';
    component.confirmPassword = 'Pass123';

    component.calculatePasswordStrength(); // Update status validasi
    component.register();

    expect(authService.register).toHaveBeenCalledWith('baru', 'Pass123');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
