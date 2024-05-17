import React, { useState, useMemo, useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Chart from "chart.js/auto";
import getCountries from "../utils/getCountries";

const AttrCountryGraph = () => {
  const [selectedOption, setSelectedOption] = useState("pays");
  const chartRef = useRef(null);
  const chartRefModal = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [displayCountries, setDisplayCountries] = useState([]);

  const departments = [
    "Engage - Project & Agility",
    "Data & AI",
    "Cloud Native Solutions",
    "Région Sud-Est Lyon",
    "MultiCloud (Telecom)",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      setFilteredCountries(data);
      setDisplayCountries(data.slice(0, 5));
    };
    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const generateRandomData = (length) => {
    return Array.from({ length }, () => Math.random() * 0.9 + 0.1);
  };

  const countryData = useMemo(() => {
    return {
      labels: displayCountries.map((country) => country.name.common),
      datasets: [
        {
          data: generateRandomData(displayCountries.length),
          backgroundColor: "rgba(255, 73, 110, 0.9)",
          borderColor: "rgba(255, 73, 110, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [displayCountries]);

  const departmentData = useMemo(() => {
    return {
      labels: departments,
      datasets: [
        {
          data: generateRandomData(departments.length),
          backgroundColor: "rgba(255, 73, 110, 0.9)",
          borderColor: "rgba(255, 73, 110, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [departments]);

  const chartData = selectedOption === "pays" ? countryData : departmentData;

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
        data: chartData,
        options: countryOptions,
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [showModal, chartData, countryOptions]);

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
      <Bar data={chartData} options={countryOptions} onClick={handleGraphClick} />
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
                    className="text-white bg-secondary rounded-full font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
