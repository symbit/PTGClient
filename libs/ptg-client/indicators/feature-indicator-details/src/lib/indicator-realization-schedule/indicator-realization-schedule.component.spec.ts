import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndicatorRealizationScheduleComponent } from './indicator-realization-schedule.component';

describe('RealizationScheduleComponent', () => {
  let component: IndicatorRealizationScheduleComponent;
  let fixture: ComponentFixture<IndicatorRealizationScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicatorRealizationScheduleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IndicatorRealizationScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
