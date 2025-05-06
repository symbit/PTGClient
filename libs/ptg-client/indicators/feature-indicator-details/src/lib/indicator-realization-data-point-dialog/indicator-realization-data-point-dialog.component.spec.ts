import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndicatorRealizationDataPointDialogComponent } from './indicator-realization-data-point-dialog.component';

describe('IndicatorRealizationDataPointDialogComponent', () => {
  let component: IndicatorRealizationDataPointDialogComponent;
  let fixture: ComponentFixture<IndicatorRealizationDataPointDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicatorRealizationDataPointDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      IndicatorRealizationDataPointDialogComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
