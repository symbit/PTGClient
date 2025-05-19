import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { ArticlesStore } from '@ptg/articles-data-access-articles';
import { DatePipe } from '@angular/common';
import { Table, TableModule, TablePageEvent } from 'primeng/table';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { MenuItem } from 'primeng/api';
import {
  AngularCdkTeleportService,
  SectorPipe,
  SentimentMapper,
} from '@ptg/shared-utils';
import { Menu } from 'primeng/menu';
import { Article } from '@ptg/articles-types';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDeleteDialogComponent } from '@ptg/shared-ui-confirm-delete-dialog';
import { firstValueFrom } from 'rxjs';
import { ArticleSummaryDialogComponent } from '../article-summary-dialog/article-summary-dialog.component';
import { ArticleEditDialogComponent } from '../article-edit-dialog/article-edit-dialog.component';
import { Sort } from '@ptg/shared-types';
import { ArticlesFiltersComponent } from '../articles-filters/articles-filters.component';
import { DomPortal } from '@angular/cdk/portal';

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
    ArticlesFiltersComponent,
  ],
  providers: [ArticlesStore, DialogService],
})
export class ArticlesListComponent implements OnInit, OnDestroy {
  readonly table = viewChild<Table>('table');
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

  @ViewChild('content') set content(elemRef: ElementRef<HTMLElement>) {
    this._angularCdkTeleportService.teleport(new DomPortal(elemRef));
  }

  private readonly _dialogService = inject(DialogService);
  private readonly _articlesStore = inject(ArticlesStore);
  private readonly _angularCdkTeleportService = inject(
    AngularCdkTeleportService,
  );

  ngOnInit(): void {
    this._articlesStore.loadArticles({
      ...this._articlesStore.criteria(),
      pageSize: 10,
      filters: [
        {
          name: 'isRelevant',
          value: this.type() === 'accepted',
          behaviour: 'AND',
        },
      ],
    });
  }

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

  onSort(sort: Sort): void {
    this._articlesStore.loadArticles({
      page: 1,
      pageSize: ROWS_PER_PAGE,
      sort: sort.order === 1 ? `${sort.field}-asc` : `${sort.field}-desc`,
      filters: this._articlesStore.criteria().filters,
    });
  }

  onPageChange(page: TablePageEvent): void {
    const { sortOrder, sortField } = this.table()!.createLazyLoadMetadata();

    this._articlesStore.loadArticles({
      page: page.first / ROWS_PER_PAGE + 1,
      pageSize: ROWS_PER_PAGE,
      sort: sortField
        ? sortOrder === 1
          ? `${sortField}-asc`
          : `${sortField}-desc`
        : '',
      filters: this._articlesStore.criteria().filters,
    });
  }

  ngOnDestroy(): void {
    this._angularCdkTeleportService.finishTeleportation();
  }
}
