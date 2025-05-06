import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndicatorEditDialogComponent } from './indicator-edit-dialog.component';

describe('IndicatorEditDialogComponent', () => {
  let component: IndicatorEditDialogComponent;
  let fixture: ComponentFixture<IndicatorEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicatorEditDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IndicatorEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
