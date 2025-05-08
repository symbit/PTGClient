import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisCreatorWrapperComponent } from './analysis-creator-wrapper.component';

describe('AnalysisFeatureAnalysisCreatorComponent', () => {
  let component: AnalysisCreatorWrapperComponent;
  let fixture: ComponentFixture<AnalysisCreatorWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisCreatorWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisCreatorWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
