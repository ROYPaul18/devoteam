import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { Bars } from 'react-loader-spinner'; // Importer le loader

const AttrGenderGraph = () => {
  const chartRef = useRef(null);
  const [dataGenderChart, setDataGenderChart] = useState({});
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/attrition_rate_male_female');
        const { tauxAttritionMale, tauxAttritionFemale } = response.data;
        setDataGenderChart({
          labels: [""],
          datasets: [
            {
              label: "homme",
              data: [tauxAttritionMale],
              backgroundColor: ["rgba(255, 168, 125, 0.7)"],
              borderColor: ["rgba(255, 168, 125, 1)"],
              borderWidth: 1,
            },
            {
              label: "femme",
              data: [tauxAttritionFemale],
              backgroundColor: "rgba(96, 175, 94, 0.7)",
              borderColor: "rgba(96, 175, 94, 1)",
              borderWidth: 1,
            },
          ],          
        });
        setLoading(false); // Fin du chargement
      } catch (error) {
        console.error(error);
        setLoading(false); // Fin du chargement même en cas d'erreur
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(dataGenderChart).length === 0) return;

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
            display: false,
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [dataGenderChart]);

  return (
    <div className='relative w-96 h-full'> {/* Conteneur avec position relative */}
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
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default AttrGenderGraph;