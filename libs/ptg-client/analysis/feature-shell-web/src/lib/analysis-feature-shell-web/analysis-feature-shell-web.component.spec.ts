import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisFeatureShellWebComponent } from './analysis-feature-shell-web.component';

describe('AnalysisFeatureShellWebComponent', () => {
  let component: AnalysisFeatureShellWebComponent;
  let fixture: ComponentFixture<AnalysisFeatureShellWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisFeatureShellWebComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisFeatureShellWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
