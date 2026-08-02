import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { retry } from 'rxjs';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.html',
  standalone: false,
  styleUrl: './fetch-data.css',
})
export class FetchData {
  public forecasts = signal<WeatherForecast[]>([]);
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getForecasts();
  }
  getForecasts() {
    this.http.get<WeatherForecast[]>(this.baseUrl + 'api/weatherforecast')
      .pipe(retry({ count: 3, delay: 1000 }))
      .subscribe({
        next: (result) => this.forecasts.set(result),
        error: (err) => console.error(err)
      });
  }
}
