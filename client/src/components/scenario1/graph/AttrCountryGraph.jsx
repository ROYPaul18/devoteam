import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import locationInverse from "../utils/locationInverse";
import { Bars } from 'react-loader-spinner'; 

const AttrCountryGraph = () => {
  const [selectedOption, setSelectedOption] = useState("departement");
  const [locationData, setLocationData] = useState({
    labels: [],
    datasets: [],
  });
  const [departmentData, setDepartmentData] = useState({
    labels: [],
    datasets: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const chartRefModal = useRef(null);

  useEffect(() => {
    if (selectedOption === "location") {
      getLocationData();
    } else if (selectedOption === "departement") {
      getDepartmentData();
    }
  }, [selectedOption]);

  const getLocationData = async () => {
    setLoading(true); // Début du chargement
    const response = await axios.get(
      "http://localhost:3001/api/count_people_by_location"
    );
    const data = response.data;
    const labels = Object.keys(data).map(
      (code) => locationInverse(code) || "Inconnu"
    ); // Utilisation de locationInverse ici
    const attritionRates = Object.values(data).map((value) =>
      parseFloat(value)
    );
    setLocationData({
      labels: labels,
      datasets: [
        {
          label: "Taux d’attrition (%)",
          data: attritionRates,
          backgroundColor: "#FF496E",
          borderColor: "#FF496E",
          borderWidth: 1,
        },
      ],
    });
    setLoading(false); // Fin du chargement
  };

  const getDepartmentData = async () => {
    setLoading(true); // Début du chargement
    const response = await axios.get(
      "http://localhost:3001/api/calc_attrition_by_os_departement"
    );
    const data = response.data;
    const labels = Object.keys(data);
    const attritionRates = Object.values(data).map((value) =>
      parseFloat(value)
    );
    setDepartmentData({
      labels: labels,
      datasets: [
        {
          label: "Taux d’attrition (%)",
          data: attritionRates,
          backgroundColor: "#FF496E",
          borderColor: "#FF496E",
          borderWidth: 1,
        },
      ],
    });
    setLoading(false); // Fin du chargement
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleGraphClick = () => {
    setShowModal(true);
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
      y: {
        barThickness: 24,
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
    },
  };

  const modalOptions = {
    ...options,
    scales: {
      ...options.scales,
      y: {
        ...options.scales.y,
        barThickness: 30,
        maxBarThickness: 30,
      },
    },
  };

  const getLimitedData = (data, limit = 5) => ({
    labels: data.labels.slice(0, limit),
    datasets: data.datasets.map((ds) => ({
      ...ds,
      data: ds.data.slice(0, limit),
    })),
  });

  return (
    <div className="relative w-11/12 h-3/4">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-0">
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
      <h1 className="mb-2 text-secondary text-md 2xl:text-xl 2xl:mb-4">
        Taux d’attrition par départements, pays
      </h1>
      <select
        className="border-4 border-secondary rounded 2xl:p-1 text-secondary text-base 2xl:text-lg"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="location">Location</option>
        <option value="departement">Département OS</option>
      </select>
      <div className={`w-full h-full ${loading ? 'opacity-50' : ''}`}>
        {selectedOption === "location" && (
          <Bar
            data={getLimitedData(locationData)}
            options={options}
            onClick={handleGraphClick}
            className="cursor-pointer"
          />
        )}
        {selectedOption === "departement" && (
          <Bar
            data={getLimitedData(departmentData)}
            options={options}
            onClick={handleGraphClick}
            className="cursor-pointer"
          />
        )}
      </div>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-3/4 my-6 mx-auto max-w-7xl h-4/5">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div
                  className="relative p-6 flex-auto"
                  style={{ maxHeight: "800px", overflowY: "auto" }}
                >
                  {selectedOption === "location" && (
                    <Bar
                      data={locationData}
                      options={modalOptions}
                      className="w-full"
                    />
                  )}
                  {selectedOption === "departement" && (
                    <div style={{ maxHeight: "800px", overflowY: "auto" }}>
                      <Bar
                        data={departmentData}
                        options={modalOptions}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
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