import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PredictionPdfComponent } from './prediction-pdf.component';

describe('PredictionPdfComponent', () => {
  let component: PredictionPdfComponent;
  let fixture: ComponentFixture<PredictionPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionPdfComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictionPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
