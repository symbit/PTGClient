import { ChartOptions, LegendItem } from 'chart.js';

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
  },
};
