import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureShellWebComponent } from './feature-shell-web.component';

describe('FeatureShellWebComponent', () => {
  let component: FeatureShellWebComponent;
  let fixture: ComponentFixture<FeatureShellWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureShellWebComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureShellWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
