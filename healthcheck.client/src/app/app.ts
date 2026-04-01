import { HttpClient } from '@angular/common/http';
// 1. Added OnInit to the core imports
import { Component, signal, OnInit } from '@angular/core';

// 2. This interface tells TypeScript what the Backend data looks like
interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  public forecasts = signal<WeatherForecast[]>([]);

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('https://localhost:7289/weatherforecast').subscribe({
      next: (result) => {
        // 2. Update the signal using .set()
        this.forecasts.set(result);
        console.log("Data is now in the signal:", this.forecasts());
      },
      error: (err) => console.error(err)
    });
  }

  protected readonly title = signal('healthcheck.client');
}
