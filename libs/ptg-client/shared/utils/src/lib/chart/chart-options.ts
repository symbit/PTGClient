import { ChartOptions, LegendItem } from 'chart.js';
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';

Chart.register(zoomPlugin);

export function mergeChartOptions(target: any, source: any): any {
  if (typeof source !== 'object' || source === null) return source;

  const result = { ...target };

  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = result[key];

    if (Array.isArray(sourceValue)) {
      result[key] = sourceValue.slice(); // Shallow copy array
    } else if (
      typeof sourceValue === 'object' &&
      sourceValue !== null &&
      typeof targetValue === 'object' &&
      targetValue !== null
    ) {
      result[key] = mergeChartOptions(targetValue, sourceValue);
    } else {
      result[key] = sourceValue;
    }
  }

  return result;
}

export const chartOptions: ChartOptions = {
  responsive: true,
  animation: false,
  aspectRatio: 3,
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'month',
        displayFormats: {
          month: 'MM.yyyy', // Display format
        },
        parser: 'MM.yyyy', // Input format
      },
      ticks: {
        source: 'auto',
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'right',
      align: 'start',
      onClick: () => null,
      labels: {
        filter: (legendItem: LegendItem) => {
          return !!legendItem.text;
        },
        useBorderRadius: true,
        borderRadius: 5,
        boxWidth: 10,
        boxHeight: 10,
      },
    },
    zoom: {
      pan: {
        enabled: true,
        mode: 'xy',
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: 'xy',
      },
    },
    datalabels: {
      display: false,
    },
  },
};
