import React from 'react';
import { Line } from 'react-chartjs-2';

const LineGraph = ({ labels, datasets }) => {
  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
        ...dataset,
        fill: true,
      })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: '#fff',
          },
          gridLines: {
            display:false
        }

        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: '#fff',
          },
          gridLines: {
            display:false
        }
        },
      ],
    },
    legend: {
      labels: {
        fontColor: '#fff',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineGraph;
