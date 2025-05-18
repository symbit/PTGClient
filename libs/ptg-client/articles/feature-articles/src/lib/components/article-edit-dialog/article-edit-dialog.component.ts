import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ArticlesStore } from '@ptg/articles-data-access-articles';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { sectorMapper, SentimentMapper } from '@ptg/shared-utils';
import { ConstantsStore } from '@ptg/shared-data-access-constants';
import { MultiSelect } from 'primeng/multiselect';
import { Sentiment } from '@ptg/articles-types';

@Component({
  selector: 'ptg-article-edit-dialog',
  template: `
    <form class="flex flex-col gap-4" [formGroup]="form">
      <div class="flex flex-col gap-2">
        <label for="sentiment">Sentyment</label>
        <p-select
          id="sentiment"
          [options]="sentimentOptions"
          formControlName="sentiment"
          class="w-full"
          appendTo="body"
        >
          <ng-template #item let-sentiment>
            <div>{{ sentiment | sentiment }}</div>
          </ng-template>

          <ng-template #selectedItem let-sentiment>
            <div>{{ sentiment | sentiment }}</div>
          </ng-template>
        </p-select>
      </div>

      <div class="flex flex-col gap-2">
        <label for="sectors">Branże</label>
        <p-multiselect
          id="sectors"
          [options]="sectorOptions()"
          formControlName="sectors"
          class="w-full"
          appendTo="body"
          selectedItemsLabel="{0} wybranych branż"
        >
        </p-multiselect>
      </div>
    </form>

    <div class="flex gap-2 justify-start mt-4">
      <p-button
        type="button"
        label="Zapisz zmiany"
        severity="secondary"
        [disabled]="form.invalid || !form.dirty"
        (click)="save()"
      />
      <p-button
        type="button"
        label="Anuluj"
        severity="contrast"
        [outlined]="true"
        (click)="dialogRef.close()"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Select, ReactiveFormsModule, SentimentMapper, MultiSelect],
})
export class ArticleEditDialogComponent {
  private readonly _fb = inject(FormBuilder);

  readonly articlesStore = inject(ArticlesStore);
  readonly constantsStore = inject(ConstantsStore);
  readonly dynamicDialogConfig = inject(DynamicDialogConfig);
  readonly dialogRef = inject(DynamicDialogRef);

  readonly sentimentOptions = ['positive', 'negative', 'neutral'];
  readonly sectorOptions = computed(() => {
    const sectors = this.constantsStore.sectors();

    if (!sectors) return [];

    return sectors.map((sector) => ({
      label: sectorMapper(sector),
      value: sector,
    }));
  });
  readonly form = this._fb.group({
    sentiment: ['', Validators.required],
    sectors: [null, Validators.required],
  });

  get data() {
    return this.dynamicDialogConfig.data;
  }

  constructor() {
    this.form.patchValue(this.data.article);
  }

  save(): void {
    if (this.form.invalid) return;

    const id = this.data.article.id;
    const { sentiment, sectors } = this.form.value;

    if (this.form.controls.sectors.dirty) {
      this.articlesStore.setSectors({
        id,
        sectors: sectors || [],
      });
    }

    if (this.form.controls.sentiment.dirty) {
      this.articlesStore.setSentiment({
        id,
        sentiment: (sentiment as Sentiment) || 'neutral',
      });
    }

    this.dialogRef.close();
  }
}
