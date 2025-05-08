import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisCreatorIndicatorsComponent } from './analysis-creator-indicators.component';

describe('AnalysisCreatorIndicatorsComponent', () => {
  let component: AnalysisCreatorIndicatorsComponent;
  let fixture: ComponentFixture<AnalysisCreatorIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisCreatorIndicatorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisCreatorIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
