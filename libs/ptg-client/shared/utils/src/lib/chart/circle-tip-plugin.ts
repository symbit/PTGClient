export const circleTipPlugin = {
  id: 'circleTipPlugin',
  afterDatasetDraw(chart: any, args: any, options: any) {
    const { ctx, chartArea } = chart;
    const dataset = chart.data.datasets[args.index];

    if (dataset.type !== 'bar') return;

    const meta = chart.getDatasetMeta(args.index);
    meta.data.forEach((bar: any, i: any) => {
      const x = bar.x;
      const y = bar.y;

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, options.radius || 4, 0, 2 * Math.PI);
      ctx.fillStyle = options.color || '#18366C';
      ctx.fill();
      ctx.restore();
    });
  },
};
