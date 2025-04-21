import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesStatisticsComponent } from './articles-statistics.component';

describe('ArticlesStatisticsComponent', () => {
  let component: ArticlesStatisticsComponent;
  let fixture: ComponentFixture<ArticlesStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesStatisticsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
