import { ChartOptions, LegendItem } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart } from 'chart.js';

Chart.register(zoomPlugin);

const zoomOptions = {
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
} as any;

export const chartOptions: ChartOptions = {
  responsive: true,
  aspectRatio: 3,
  scales: {
    x: {
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
    zoom: zoomOptions,
    datalabels: {
      display: false,
    } as any,
  },
};
