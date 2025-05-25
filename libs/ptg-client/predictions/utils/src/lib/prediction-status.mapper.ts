import { PredictionStatus } from '@ptg/predictions-types';

export function predictionStatusMapper(status: PredictionStatus) {
  switch (status) {
    case 'inprogress':
      return 'W trakcie';
    case 'success':
      return 'Wygenerowana';
    case 'failure':
      return 'Błąd';
    default:
      return 'Nieznany';
  }
}
