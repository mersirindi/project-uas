import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// HAPUS import Dashboard dari sini agar tidak bentrok dengan Router

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Cukup RouterOutlet saja
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('project-uas');
}
