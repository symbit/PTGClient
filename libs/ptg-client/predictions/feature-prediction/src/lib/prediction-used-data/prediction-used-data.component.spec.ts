import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PredictionUsedDataComponent } from './prediction-used-data.component';

describe('PredictionUsedDataComponent', () => {
  let component: PredictionUsedDataComponent;
  let fixture: ComponentFixture<PredictionUsedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionUsedDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictionUsedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
