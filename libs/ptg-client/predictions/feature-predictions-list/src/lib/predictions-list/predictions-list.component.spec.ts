import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PredictionsListComponent } from './predictions-list.component';

describe('PredictionsFeaturePredictionsListComponent', () => {
  let component: PredictionsListComponent;
  let fixture: ComponentFixture<PredictionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
