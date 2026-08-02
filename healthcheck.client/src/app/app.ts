import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenu } from './nav-menu/nav-menu'; // or './nav-menu/nav-menu.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'HealthCheck';
}
