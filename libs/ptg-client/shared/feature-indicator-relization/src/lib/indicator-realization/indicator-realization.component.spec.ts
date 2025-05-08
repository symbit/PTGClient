import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndicatorRealizationComponent } from './indicator-realization.component';

describe('RealizationScheduleComponent', () => {
  let component: IndicatorRealizationComponent;
  let fixture: ComponentFixture<IndicatorRealizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicatorRealizationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IndicatorRealizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
