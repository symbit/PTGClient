import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ArticlesStore } from '@ptg/articles-data-access-articles';
import { DatePipe } from '@angular/common';
import { SentimentPipe } from './sentiment.pipe';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { Dialog } from 'primeng/dialog';
import { DefaultSearchCriteria } from '@ptg/shared-types';

@Component({
  selector: 'ptg-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SentimentPipe,
    TableModule,
    DatePipe,
    Button,
    Tag,
    ConfirmPopup,
    Dialog,
  ],
  providers: [ConfirmationService],
})
export class ArticlesListComponent implements OnInit {
  readonly state = inject(ArticlesStore);
  readonly confirmationService = inject(ConfirmationService);

  readonly articles = computed(() => this.state.entities() || []);
  readonly visible = signal(false);

  ngOnInit(): void {
    this.state.loadArticles(DefaultSearchCriteria);
  }

  clonfirmBlock(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      rejectButtonProps: {
        label: 'Anuluj',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Odrzuć',
        severity: 'secondary',
      },
      accept: () => {
        console.log('accept');
      },
      reject: () => {
        console.log('reject');
      },
    });
  }

  showSummary() {
    this.visible.set(true);
  }
}
