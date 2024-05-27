import React, { useState, useMemo, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Chart from "chart.js/auto";
import getCountries from "../utils/getCountries";
import axios from "axios";

const AttrCountryGraph = () => {
  const [selectedOption, setSelectedOption] = useState("pays");
  const chartRef = useRef(null);
  const chartRefModal = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [displayCountries, setDisplayCountries] = useState([]);
  const [departmentData, setDepartmentData] = useState(null);

  const departments = [
    "Département 1",
    "Département 2",
    "Département 3",
    "Département 4",
    "Département 5",
  ];

  const getCountsByLocation = async () => {
    const response = await axios.get('/api/count_people_by_location');
    return response.data;
  };

  const getAttritionByOsDepartement = async () => {
    const response = await axios.get('/api/calc_attrition_by_os_departement');
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const countsByLocation = await getCountsByLocation();
      const countries = await getCountries();
      const countriesWithCounts = countries.map(country => ({
         ...country,
         count: countsByLocation[country.name.common]?.count || 0,
         endDateCount: countsByLocation[country.name.common]?.endDateCount || 0,
      }));
      setFilteredCountries(countriesWithCounts);
      setDisplayCountries(countriesWithCounts.slice(0, 5));

      const attritionByOsDepartement = await getAttritionByOsDepartement();
      setDepartmentData({
        labels: departments,
        datasets: [
          {
            label: 'Taux d’attrition',
            data: departments.map(department => attritionByOsDepartement[department] || 0),
            backgroundColor: "rgba(255, 73, 110, 0.9)",
            borderColor: "rgba(255, 73, 110, 1)",
            borderWidth: 1,
          },
        ],
      });
    };
    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const countryData = useMemo(() => {
    return {
      labels: displayCountries.map((country) => country.name.common),
      datasets: [
        {
          label: 'Nombre total',
          data: displayCountries.map((country) => country.count),
          backgroundColor: "rgba(255, 73, 110, 0.9)",
          borderColor: "rgba(255, 73, 110, 1)",
          borderWidth: 1,
        },
        {
          label: 'Nombre avec date de fin',
          data: displayCountries.map((country) => country.endDateCount),
          backgroundColor: "rgba(0, 123, 255, 0.9)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [displayCountries]);

  const countryOptions = {
    indexAxis: "y",
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
          color: "rgba(0, 0, 0, 0.8)",
        },
      },
      y: {
        ticks: {
          color: "rgba(0, 0, 0, 0.8)",
        },
      },
    },
  };

  const handleGraphClick = () => {
    handleShowAllCountries();
    setShowModal(true);
  };

  const handleShowAllCountries = () => {
    setDisplayCountries(filteredCountries);
  };

  useEffect(() => {
    if (showModal && chartRefModal.current) {
      const chartInstance = new Chart(chartRefModal.current, {
        type: "bar",
        data: departmentData,
        options: countryOptions,
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [showModal, departmentData, countryOptions]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div style={{ width: "35vw", height: "26vh" }}>
      <h1 className="mb-4 text-secondary text-xl">
        Taux d’attrition par départements, pays
      </h1>
      <select
        className="border-4 border-secondary rounded p-1 text-secondary"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="pays">Pays</option>
        <option value="departement">Département</option>
      </select>
      <Bar data={countryData} options={countryOptions} onClick={handleGraphClick}  className="cursor-pointer"/>
        {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-3/4 my-6 mx-auto max-w-7xl h-4/5">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <select
                    className="border-4 border-secondary rounded p-1 text-secondary mb-4"
                    value={selectedOption}
                    onChange={handleSelectChange}
                  >
                    <option value="pays">Pays</option>
                    <option value="departement">Département</option>
                  </select>
                  <div className="overflow-y-auto max-h-[600px]">
                    <canvas ref={chartRefModal} className="w-full" />
                  </div>
                </div>
                <div className="flex items-center justify-end p-2 border-t border-solid border-slate-00 rounded-b">
                  <button
                    className="text-white bg-secondary rounded-full font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-tertiary"
                    type="button"
                    onClick={handleModalClose}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
};

export default AttrCountryGraph;
