import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PredictionsFeatureShellWebComponent } from './predictions-feature-shell-web.component';

describe('PredictionsFeatureShellWebComponent', () => {
  let component: PredictionsFeatureShellWebComponent;
  let fixture: ComponentFixture<PredictionsFeatureShellWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionsFeatureShellWebComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictionsFeatureShellWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
