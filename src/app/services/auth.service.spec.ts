import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);

    // MOCKING LOCALSTORAGE
    // Kita "memata-matai" fungsi localStorage agar tidak benar-benar menyimpan ke browser saat test
    // dan kita bisa mengatur return value-nya (misal: simulasi user sudah ada)
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {});
  });

  afterEach(() => {
    // Bersihkan semua mock setelah setiap test selesai
    vi.restoreAllMocks();
  });

  it('harus membuat service', () => {
    expect(service).toBeTruthy();
  });

  // --- TEST REGISTER ---
  it('harus berhasil register user baru (return true)', () => {
    // Simulasi: Belum ada user di database (return array kosong)
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify([]));

    const result = service.register('tom', '123');

    expect(result).toBe(true);
    // Pastikan setItem dipanggil (data disimpan)
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('harus gagal register jika username sudah ada (return false)', () => {
    // Simulasi: Sudah ada user bernama 'tom'
    const existingUsers = [{ username: 'tom', password: '123', role: 'user' }];
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(existingUsers));

    const result = service.register('tom', '999');

    expect(result).toBe(false);
    // Pastikan data TIDAK ditimpa
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  // --- TEST LOGIN ---
  it('harus berhasil login dengan kredensial benar', () => {
    // Simulasi: Database punya user 'tom'
    const dbUsers = [{ username: 'tom', password: '123', role: 'user' }];
    // Mock getItem untuk 'users' (database)
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'users') return JSON.stringify(dbUsers);
      return null;
    });

    const result = service.login('tom', '123');

    expect(result).toBe(true);
    // Pastikan session disimpan (currentUser)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'currentUser',
      expect.stringContaining('tom')
    );
  });

  it('harus gagal login jika password salah', () => {
    const dbUsers = [{ username: 'tom', password: '123', role: 'user' }];
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(dbUsers));

    const result = service.login('tom', 'salahpassword');

    expect(result).toBe(false);
    // Pastikan session TIDAK dibuat
    expect(localStorage.setItem).not.toHaveBeenCalledWith('currentUser', expect.anything());
  });

  // --- TEST LOGOUT ---
  it('harus menghapus session saat logout', () => {
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('currentUser');
  });

  // --- TEST GET CURRENT USER ---
  it('harus mengembalikan data user jika sedang login', () => {
    const sessionUser = { username: 'tom', role: 'user' };
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(sessionUser));

    const user = service.getCurrentUser();
    expect(user).toEqual(sessionUser);
  });

  it('harus mengembalikan null jika tidak ada user login', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    const user = service.getCurrentUser();
    expect(user).toBeNull();
  });
});
