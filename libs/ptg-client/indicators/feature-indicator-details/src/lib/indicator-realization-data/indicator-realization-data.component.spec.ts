import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndicatorRealizationDataComponent } from './indicator-realization-data.component';

describe('IndicatorDataComponent', () => {
  let component: IndicatorRealizationDataComponent;
  let fixture: ComponentFixture<IndicatorRealizationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicatorRealizationDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IndicatorRealizationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
