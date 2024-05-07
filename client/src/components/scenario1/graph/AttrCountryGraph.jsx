import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const data = {
  labels: ["FR", "UK", "USA", "IT", "CA"],
  datasets: [
    {
      data: [10, 20, 30, 40, 50],
      backgroundColor: "rgba(255, 73, 110, 0,9)",
      borderColor: "rgba(255, 73, 110, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
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
        color: "rgba(0, 0, 0, 0, 0)",
      },
    },
    y: {
      ticks: {
        color: "rgba(0, 0, 0, 0, 0)",
      },
    },
  },
};

const AttrCountryGraph = () => (
  <div style={{ width: "35vw", height: "37vh" }}>
    <h1 className="mb-4 text-secondary text-xl">
      {" "}
      Taux d’attrition par départements, pays{" "}
    </h1>
    <select
      name=""
      id=""
      className="border-4 border-secondary rounded p-1 text-secondary"
    >
      <option value="pays">Pays</option>
      <option value="departement">Département</option>
    </select>
    <Bar data={data} options={options} />
  </div>
);

export default AttrCountryGraph;
