import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PredictionCreatorComponent } from './prediction-creator.component';

describe('PredictionCreatorComponent', () => {
  let component: PredictionCreatorComponent;
  let fixture: ComponentFixture<PredictionCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionCreatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictionCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
