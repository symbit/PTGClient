import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesFiltersComponent } from './articles-filters.component';

describe('ArticlesFiltersComponent', () => {
  let component: ArticlesFiltersComponent;
  let fixture: ComponentFixture<ArticlesFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
