import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const AgeGroupBarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/attrition_rates_by_age_group')
      .then((response) => {
        const attritionRates = response.data;
        const labels = Object.keys(attritionRates);
        const dataset = {
          label: 'Taux d\'attrition',
          data: Object.values(attritionRates),
          backgroundColor: '#FF496E',
          borderColor: '#FF496E',
          borderWidth: 1,
        };
        setChartData({
          labels,
          datasets: [dataset],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="hover:cursor-pointer w-96 h-full">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default AgeGroupBarChart;