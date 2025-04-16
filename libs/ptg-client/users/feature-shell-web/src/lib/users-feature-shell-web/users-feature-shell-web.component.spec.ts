import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersFeatureShellWebComponent } from './users-feature-shell-web.component';

describe('UsersFeatureShellWebComponent', () => {
  let component: UsersFeatureShellWebComponent;
  let fixture: ComponentFixture<UsersFeatureShellWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersFeatureShellWebComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersFeatureShellWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
