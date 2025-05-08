import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisCreatorScheduleComponent } from './analysis-creator-schedule.component';

describe('AnalysisCreatorScheduleComponent', () => {
  let component: AnalysisCreatorScheduleComponent;
  let fixture: ComponentFixture<AnalysisCreatorScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisCreatorScheduleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisCreatorScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
