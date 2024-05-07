import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';


const dataGenderChart = {
    labels: [""],
    datasets: [
      {
        label: "homme",
        data: [0.5],
        backgroundColor: ["rgba(255, 168, 125, 0.7)"],
        borderColor: ["rgba(255, 168, 125, 1)"],
        borderWidth: 1,
      },
      {
        label: "femme",
        data: [0.4],
        backgroundColor: "rgba(96, 175, 94, 0.7)",
        borderColor: "rgba(96, 175, 94, 1)",
        borderWidth: 1,
      },
    ],
  };

const AttrGenderGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: 'bar',
      data: dataGenderChart,
      options: {
        indexAxis: 'x',
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          y: {
            grid: {
              drawOnChartArea: false,
            },
          },
          x: {
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    });
  
    return () => {
      chartInstance.destroy();
    };
  }, [dataGenderChart]);
  

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default AttrGenderGraph;