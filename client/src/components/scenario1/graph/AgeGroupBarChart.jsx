import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Bars } from 'react-loader-spinner'; // Importer le loader

const AgeGroupBarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true); // État de chargement

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
        setLoading(false); // Fin du chargement
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Fin du chargement même en cas d'erreur
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
    <div className="relative hover:cursor-pointer w-96 h-full"> {/* Conteneur avec position relative */}
      {loading && ( // Afficher le loader si les données sont en cours de chargement
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
          <Bars
            height={80}
            width={80}
            color="#FF496E"
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#FF496E"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
      <div className={`w-full h-full ${loading ? 'opacity-50' : ''}`}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AgeGroupBarChart;