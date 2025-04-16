import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatesFeatureShellWebComponent } from './rates-feature-shell-web.component';

describe('RatesFeatureShellWebComponent', () => {
  let component: RatesFeatureShellWebComponent;
  let fixture: ComponentFixture<RatesFeatureShellWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatesFeatureShellWebComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RatesFeatureShellWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
