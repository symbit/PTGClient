import { inject, Injectable, signal } from '@angular/core';
import {
  PredictionsListStore,
  PredictionsService,
} from '@ptg/predictions-data-access-predictions';
import { rxResource } from '@angular/core/rxjs-interop';
import { CreatePrediction } from '@ptg/predictions-types';
import { IndicatorGroup } from '@ptg/indicators-types';
import { of } from 'rxjs';

@Injectable()
export class PredictionCreatorLocalState {
  private readonly _predictionsService = inject(PredictionsService);
  private readonly _predictionsListStore = inject(PredictionsListStore);

  readonly group = signal<IndicatorGroup | null>(null);

  readonly predictionsDefinitions = rxResource({
    loader: () => this._predictionsService.getPredictionsDefinitions(),
  });

  readonly predictionsDefinitionsByGroup = rxResource({
    request: () => this.group(),
    loader: () => {
      const group = this.group();
      if (!group) return of([]);

      return this._predictionsService.getPredictionsDefinitionsByGroup(group);
    },
  });

  generatePrediction(payload: CreatePrediction) {
    this._predictionsListStore.createPrediction(payload);
  }
}
