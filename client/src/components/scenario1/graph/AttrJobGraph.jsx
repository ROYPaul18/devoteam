import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const data = {
  labels: ['Marketing', 'DevOps Infra', 'Elastic', 'Human Resources', 'IT Services  '],
  datasets: [
    {
      label: 'My Dataset',
      data: [10, 20, 30, 40, 50],
      backgroundColor: 'rgba(255, 73, 110, 1)',
      borderColor: 'rgba(255, 73, 110, 1)',
      borderWidth: 0.5,
      
}],
};

const options = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        beginAtZero: true,
        color: "rgba(0, 0, 0, 0, 0)"
      },
    },
  },
};

const AttrJobGraph = () => (
  <div>
    <Bar data={data} options={options} />
  </div>
);

export default AttrJobGraph;
