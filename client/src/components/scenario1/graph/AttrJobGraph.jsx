import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const data = {
  labels: ['Marketing', 'DevOps Infra', 'Elastic', 'Human Resources', 'IT Services  '],
  datasets: [
    {
      label: 'My Dataset',
      data: [10, 20, 30, 40, 50],
      backgroundColor: '#ECFBFF',
      borderColor: '#ECFBFF',
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
  <div className='relative w-72 2xl:w-96 h-full'>
    <Bar data={data} options={options} />
  </div>
);

export default AttrJobGraph;
