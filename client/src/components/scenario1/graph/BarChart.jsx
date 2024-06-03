import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: 'bar',
      data: data,
      options: {
        ...options,  
        responsive: true, 
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: [{
            grid: {
            drawOnChartArea: false
            }
          }],
          x: [{
            grid: {
            drawOnChartArea: false,
            
            }
          }],
        }
    }
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data, options]);

  return <canvas ref={chartRef} />;
};

export default BarChart;