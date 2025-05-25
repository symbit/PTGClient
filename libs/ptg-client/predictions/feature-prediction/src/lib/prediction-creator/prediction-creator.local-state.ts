import { inject, Injectable } from '@angular/core';
import {
  PredictionsListStore,
  PredictionsService,
} from '@ptg/predictions-data-access-predictions';
import { rxResource } from '@angular/core/rxjs-interop';
import { CreatePrediction } from '@ptg/predictions-types';

@Injectable()
export class PredictionCreatorLocalState {
  private readonly _predictionsService = inject(PredictionsService);
  private readonly _predictionsListStore = inject(PredictionsListStore);

  readonly predictionsDefinitions = rxResource({
    loader: () => this._predictionsService.getPredictionsDefinitions(),
  });

  generatePrediction(payload: CreatePrediction) {
    this._predictionsListStore.createPrediction(payload);
  }
}
