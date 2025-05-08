import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisCreatorIndicatorRealizationComponent } from './analysis-creator-indicator-realization.component';

describe('AnalysisCreatorIndicatorRealizationComponent', () => {
  let component: AnalysisCreatorIndicatorRealizationComponent;
  let fixture: ComponentFixture<AnalysisCreatorIndicatorRealizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisCreatorIndicatorRealizationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      AnalysisCreatorIndicatorRealizationComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
