import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherOutputComponent } from './weather-output.component';

describe('WeatherOutputComponent', () => {
  let component: WeatherOutputComponent;
  let fixture: ComponentFixture<WeatherOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherOutputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
