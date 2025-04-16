import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesFeatureShellWebComponent } from './articles-feature-shell-web.component';

describe('ArticlesFeatureShellWebComponent', () => {
  let component: ArticlesFeatureShellWebComponent;
  let fixture: ComponentFixture<ArticlesFeatureShellWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesFeatureShellWebComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesFeatureShellWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
