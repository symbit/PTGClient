import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisRowDataTableComponent } from './analysis-row-data-table.component';

describe('AnalysisRowDataTableComponent', () => {
  let component: AnalysisRowDataTableComponent;
  let fixture: ComponentFixture<AnalysisRowDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisRowDataTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisRowDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
