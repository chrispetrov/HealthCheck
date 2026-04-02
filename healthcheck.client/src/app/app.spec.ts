import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [App],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('Smoke Test', () => {
    it('should verify that math still works', () => {
      expect(1 + 1).toBe(2);
    });

    it('should verify that true is true', () => {
      expect(true).toBe(true);
    });
  });
  
  it('should render title', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne('https://localhost:7289/weatherforecast');
    req.flush([]);

    const compiled = fixture.nativeElement as HTMLElement;
    // Use .trim() to remove any invisible newlines or spaces around the text
    const h1Text = compiled.querySelector('h1')?.textContent?.trim();
    expect(h1Text).toContain('Weather forecast');
  }); //this is new

  it('should retrieve weather forecasts from the server', () => {
    const mockForecasts = [
      { date: '2021-10-01', temperatureC: 20, temperatureF: 68, summary: 'Mild' },
      { date: '2021-10-02', temperatureC: 25, temperatureF: 77, summary: 'Warm' }
    ];

    component.ngOnInit();

    const req = httpMock.expectOne(request =>
      request.url.endsWith('/weatherforecast')
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockForecasts);

    expect(component.forecasts()).toEqual(mockForecasts);
  });
} );
