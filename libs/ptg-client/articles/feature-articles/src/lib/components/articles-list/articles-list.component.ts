import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { ArticlesStore } from '@ptg/articles-data-access-articles';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { MenuItem } from 'primeng/api';
import { SectorPipe, SentimentMapper } from '@ptg/shared-utils';
import { Menu } from 'primeng/menu';
import { Article } from '@ptg/articles-types';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDeleteDialogComponent } from '@ptg/shared-ui-confirm-delete-dialog';
import { firstValueFrom } from 'rxjs';
import { ArticleSummaryDialogComponent } from '../article-summary-dialog/article-summary-dialog.component';
import { ArticleEditDialogComponent } from '../article-edit-dialog/article-edit-dialog.component';

const ROWS_PER_PAGE = 10;

@Component({
  selector: 'ptg-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SentimentMapper,
    TableModule,
    DatePipe,
    Button,
    Tag,
    SectorPipe,
    Menu,
    SentimentMapper,
  ],
  providers: [DialogService],
})
export class ArticlesListComponent {
  readonly type = input<'rejected' | 'accepted'>();
  readonly state = inject(ArticlesStore);

  readonly menuSelectedItem = signal<Article | null>(null);
  readonly ROWS_PER_PAGE = ROWS_PER_PAGE;
  readonly items = computed<MenuItem[]>(() => [
    {
      label: 'Odrzuć artykuł',
      icon: 'pi pi-ban',
      visible: this.type() === 'accepted',
      command: () => this.reject(),
    },
    {
      label: 'Przywróć artykuł',
      icon: 'pi pi-reply',
      visible: this.type() === 'rejected',
      command: () => this.accept(),
    },
    {
      label: 'Podsumowanie',
      icon: 'pi pi-sparkles',
      command: () => this.showSummary(),
    },
    {
      label: 'Źródło',
      icon: 'pi pi-link',
      url: this.menuSelectedItem()?.url,
    },
    {
      label: 'Edytuj',
      icon: 'pi pi-pen-to-square',
      command: () => this.edit(),
    },
  ]);
  readonly sentimentColors: any = {
    positive: 'text-success-100',
    negative: 'text-secondary-100',
    neutral: 'text-info-100',
  };

  private readonly _dialogService = inject(DialogService);

  async reject(): Promise<void> {
    const dialog = await firstValueFrom(
      this._dialogService.open(ConfirmDeleteDialogComponent, {
        header: 'Jesteś pewny, że chcesz odrzucić wybrany artykuł?',
        modal: true,
        closable: false,
        width: '500px',
        data: {
          confirmLabel: 'Odrzuć',
          cancelLabel: 'Anuluj',
        },
      }).onClose,
    );

    if (dialog) {
      this.state.setRelevancy({
        id: this.menuSelectedItem()?.id || 0,
        relevancy: false,
      });
    }
  }

  async accept(): Promise<void> {
    const dialog = await firstValueFrom(
      this._dialogService.open(ConfirmDeleteDialogComponent, {
        header: 'Jesteś pewny, że chcesz przywrócić wybrany artykuł?',
        modal: true,
        closable: false,
        width: '500px',
        data: {
          confirmLabel: 'Przywróć',
          confirmButton: 'success',
          cancelLabel: 'Anuluj',
        },
      }).onClose,
    );

    if (dialog) {
      this.state.setRelevancy({
        id: this.menuSelectedItem()?.id || 0,
        relevancy: true,
      });
    }
  }

  edit(): void {
    this._dialogService.open(ArticleEditDialogComponent, {
      header: 'Edycja artykułu',
      modal: true,
      closable: false,
      width: '500px',
      data: {
        article: this.menuSelectedItem(),
      },
    });
  }

  showSummary() {
    this._dialogService.open(ArticleSummaryDialogComponent, {
      header: 'Podsumowanie',
      modal: true,
      closable: true,
      width: '500px',
      data: {
        summary: this.menuSelectedItem()?.summary,
      },
    });
  }
}
