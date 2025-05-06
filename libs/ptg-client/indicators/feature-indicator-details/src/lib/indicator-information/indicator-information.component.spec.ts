import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndicatorInformationComponent } from './indicator-information.component';

describe('IndicatorInformationComponent', () => {
  let component: IndicatorInformationComponent;
  let fixture: ComponentFixture<IndicatorInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicatorInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IndicatorInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
