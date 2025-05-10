import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisChartConfigComponent } from './analysis-chart-config.component';

describe('AnalysisChartConfigComponent', () => {
  let component: AnalysisChartConfigComponent;
  let fixture: ComponentFixture<AnalysisChartConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisChartConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisChartConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
