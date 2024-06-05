import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const AttritionChart = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('monthly'); // 'annual', 'quarterly', 'monthly'
  const [year, setYear] = useState(2024);

  const color1 = "rgb(255, 204, 214)";
  const color2 = "rgb(174, 50, 75)";

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  function interpolateColor(color1, color2, value) {
    const [r1, g1, b1] = color1.match(/\d+/g).map(Number);
    const [r2, g2, b2] = color2.match(/\d+/g).map(Number);

    const r = Math.round(r1 + (r2 - r1) * value);
    const g = Math.round(g1 + (g2 - g1) * value);
    const b = Math.round(b1 + (b2 - b1) * value);
    
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }

  function generateColors(data, color1, color2) {
    return data.map((value) => interpolateColor(color1, color2, value / 100));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/attrition/${period}`, {
          params: { year }
        });
        console.log('API Response:', response.data); // Log the API response
        setData(response.data);
      } catch (error) {
        console.error('Error fetching attrition data:', error);
        setData([]); // Set data to an empty array in case of error
      }
    };

    fetchData();
  }, [period, year]);

  // Ensure data is an array before mapping
  const chartData = {
    labels: Array.isArray(data) ? data.map(item => {
      if (period === 'monthly') {
        return monthNames[item.month - 1]; // Use month names
      } else if (period === 'quarterly') {
        return `Q${item.quarter}`;
      } else {
        return item.year;
      }
    }) : [],
    datasets: [
      {
        label: 'Attrition Rate',
        data: Array.isArray(data) ? data.map(item => item.rate) : [],
        backgroundColor: Array.isArray(data) ? generateColors(data.map(item => item.rate), color1, color2) : [],
        borderColor: Array.isArray(data) ? generateColors(data.map(item => item.rate), color1, color2) : [],
        borderWidth: 1,
        options: {
          legend: {
            display: false
          }
        }
      },
    ],
  };

  console.log('Chart Data:', chartData); // Log the chart data

  return (
    <div>
      <h2 className='mb-1 text-secondary text-xl'>Histograms du nombre d'attrition par mois, trimestre année</h2>
      <div className='flex justify-between'> 
        <select className='border-4 border-secondary rounded p-1 text-secondary' value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="annual">Annuel</option>
          <option value="quarterly">Trimestriel</option>
          <option value="monthly">Mensuel</option>
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)} className='border-4 border-secondary rounded p-1 text-secondary'>
          {Array.from({ length: 20 }, (_, i) => 2006 + i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className='w-11/12 h-3/4'>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default AttritionChart;