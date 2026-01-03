import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { RouterOutlet } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App], // App adalah standalone component yang mengimport RouterOutlet
    }).compileComponents();
  });

  it('harus membuat aplikasi (app instance)', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('harus memiliki router-outlet sebagai tempat navigasi', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Cek keberadaan tag <router-outlet>
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });
});
