import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComparativeAnalysisChartComponent } from './comparative-analysis-chart.component';

describe('ComparativeAnalysisChartComponent', () => {
  let component: ComparativeAnalysisChartComponent;
  let fixture: ComponentFixture<ComparativeAnalysisChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparativeAnalysisChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComparativeAnalysisChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
