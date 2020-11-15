const dynamicColorsBack = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const a = 0.5;
  return `rgba(${r},${g},${b},${a})`;
};

const dynamicColorsBorder = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const a = 1;
  return `rgba(${r},${g},${b},${a})`;
};

function createChart({ type, labels, label, data, title }) {
  const coloRBack = [
    // '#e04141', '#40FF57', '#408DFF', '#9240FF', '#FFF700'
    'rgba(224, 65, 65, 0.4)',
    'rgba(64, 255, 87, 0.4)',
    'rgba(64, 141, 255, 0.4)',
    'rgba(146, 64, 255, 0.4)',
    'rgba(255, 247, 0, 0.4)',
  ];

  const coloRBorder = [
    // '#e04141', '#40FF57', '#408DFF', '#9240FF', '#FFF700'
    'rgba(224, 65, 65, 1)',
    'rgba(64, 255, 87, 1)',
    'rgba(64, 141, 255, 1)',
    'rgba(146, 64, 255, 1)',
    'rgba(255, 247, 0, 1)',
  ];

  data.forEach(el => coloRBack.push(dynamicColorsBack()));
  data.forEach(el => coloRBorder.push(dynamicColorsBorder()));

  const chart: any = {
    type,
    options: {
      responsive: true,
      // legend: { display: false },
      title,
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          backgroundColor: coloRBack,
          borderColor: coloRBorder,
          steppedLine: false,
          fill: false,
        }
      ],
    }
  };

  if (type === 'line') {
    chart.data.datasets[0].borderColor = '#757575';
    chart.data.datasets[0].pointStyle = 'rectRot';
    chart.data.datasets[0].pointRadius = '8';
  }

  return chart;
}

export { createChart };