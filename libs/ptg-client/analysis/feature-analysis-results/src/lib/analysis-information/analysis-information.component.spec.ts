import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisInformationComponent } from './analysis-information.component';

describe('AnalysisInformationComponent', () => {
  let component: AnalysisInformationComponent;
  let fixture: ComponentFixture<AnalysisInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
