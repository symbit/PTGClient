import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ForecastTableData } from '@ptg/predictions-types';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'ptg-prediction-forecast-data-table',
  template: `
    <p-table
      [paginator]="true"
      [rows]="10"
      [value]="forecastData()"
      showGridlines
      [tableStyle]="{ 'min-width': '50rem' }"
    >
      <ng-template #header>
        <tr>
          <th>Data</th>
          <th>Wartość</th>
          <th>Dolny przedział ufności</th>
          <th>Górny przedział ufności</th>
        </tr>
      </ng-template>
      <ng-template #body let-raw>
        <tr>
          <td>{{ raw.date | date: 'MM.yyyy' }}</td>
          <td>{{ raw.value | number: '1.2-2' }}{{ unit() }}</td>
          <td>
            {{ raw.predictionLowerCi | number: '1.2-2' }}
          </td>
          <td>
            {{ raw.predictionUpperCi | number: '1.2-2' }}
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableModule, DatePipe, DecimalPipe],
})
export class PredictionForecastDataTableComponent {
  readonly forecastData = input.required<ForecastTableData[]>();
  readonly unit = input.required<string>();
}
