import React from "react";
import Filter from "./../components/scenario1/Filter"
import ListInfo from "../components/scenario1/ListInfo";
import BarChart from "../components/scenario1/graph/BarChart";
import { useState } from "react";
import ChartModal from "../components/scenario1/ChartModal";
import LastFiveUsers from "../components/scenario1/LastFiveUsers";
import LineGraph from "../components/scenario1/graph/LineGraph";

const Scenario1 = () => {
  const [selectedChartData, setSelectedChartData] = useState(null);
  const [selectedChartOptions, setSelectedChartOptions] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lineLabels = ['Jan', 'Feb', 'Mar', 'Apr',];
  const lineFakeLabels = ['Jan', 'Feb', 'Mar', 'Apr','Mai','Jun','Jul','Aug','Sep','Oct', 'Nov', 'Dec'];
  const lindeData = [
    {
      label: 'Dataset 1',
      data: [10, 20, 30, 40, 50],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ];
  const dataGenderChart = {
    labels: [""],
    datasets: [
      {
        label: "homme",
        data: [0.5],
        backgroundColor: ["rgba(255, 168, 125, 0.4)"],
        borderColor: ["rgba(255, 168, 125, 0.9)"],
        borderWidth: 1,
      },
      {
        label: "femme",
        data: [0.4],
        backgroundColor: "rgba(96, 175, 94, 0.2)",
        borderColor: "rgba(96, 175, 94, 0.9)",
        borderWidth: 1,
      },
    ],
  };

  const FakeOtherDataChart = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: "Taux d'attrion",
        data: [0.34, 0.72, 0.56, 0.87, 0.23, 0.45],
        backgroundColor: [
          'rgba(174, 50, 75, 1)',
          'rgba(174, 50, 75, 1)',
          'rgba(174, 50, 75, 1)',
          'rgba(174, 50, 75, 1)',
          'rgba(174, 50, 75, 1)',
          'rgba(174, 50, 75, 1)',
        ],
        borderColor: [
          'rgba(174, 50, 75, 0.2)',
          'rgba(174, 50, 75, 0.2)',
          'rgba(174, 50, 75, 0.2)',
          'rgba(174, 50, 75, 0.2)',
          'rgba(174, 50, 75, 0.2)',
          'rgba(174, 50, 75, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const optionsFake = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            if (value === 0) {
              return '0.0';
            } else if (value === 1) {
              return '1.0';
            }
            return value.toFixed(1);
          },
        },
      },
    },
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const dataJobChart = {
    labels: [""],
    datasets: [
      {
        label: "Développeur frontend",
        data: [0.5],
        backgroundColor: ["rgba(200, 168, 125, 0.4)"],
        borderColor: ["rgba(255, 168, 125, 0.9)"],
        borderWidth: 1,
      },
      {
        label: "Développeur backend",
        data: [0.4],
        backgroundColor: "rgba(100, 175, 94, 0.2)",
        borderColor: "rgba(96, 175, 94, 0.9)",
        borderWidth: 1,
      },
    ],
  };

  const handleChartClick = (chartData, chartOptions) => {
    setSelectedChartData(chartData);
    setSelectedChartOptions(chartOptions);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-primary px-16 lg:px-8 py-2 gap-20 md:gap-1 min-h-screen">
      <Filter />
      <div className="flex h-full mt-4 xl:mt-12">
        {/* Left Part */}
        <ListInfo />
        {/* Right Part */}
        <div className="ml-20 flex w-full h-100 gap-16 h-screen max-h-[80vh]">
          <div className="flex flex-col gap-10 w-3/6 ">
            <div className="bg-white h-1/2 rounded-3xl flex-cols items-center justify-center font-black shadow-xl p-4">
              <h1 className="mb-4 text-secondary text-xl"> Taux d’attrition par départements, pays </h1>
              <select name="" id="" className="border-4 border-secondary rounded p-1 text-secondary">
                <option value="pays">Pays</option>
                <option value="departement">Département</option>
              </select>
              <BarChart
                data={dataGenderChart}
                options={options}
                onClick={() => handleChartClick(dataGenderChart, options)}
              />
            </div>
            <div className="bg-white h-1/2 rounded-3xl flex-cols items-center justify-center font-black shadow-xl p-4">
             <h1 className="mb-4 text-secondary text-xl"> Histogrammes du nombre d’attrition par semaines, mois, trimestre année </h1> 
              <div className="flex justify-between">
              <select name="" id="" className="border-4 border-secondary rounded p-1 text-secondary">
                <option value="Mois">Mois</option>
                <option value="Trimestre">Trimestre</option>
                <option value="Année">Année</option>
              </select>
              <select name="" id="" className="border-4 border-secondary rounded p-1 text-secondary">
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
              </select>
              </div>
              <div onClick={() => handleChartClick(FakeOtherDataChart, optionsFake)}>  
              <BarChart
                data={FakeOtherDataChart}
                options={optionsFake}
              />
              </div>
            </div>
            <ChartModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                chartData={selectedChartData}
                chartOptions={selectedChartOptions}
              />
          </div>

          <div className="flex flex-col gap-8 w-2/6 h-full justify-between">
            <div onClick={() => handleChartClick(dataGenderChart, options)} className="bg-white h-1/3 rounded-3xl flex-cols items-center justify-center font-black shadow-xl p-4">
              <h1 className="text-secondary text-xl"> Taux d’attrition/Genre</h1>
              <BarChart
                data={dataGenderChart}
                options={options}
                onClick={() => handleChartClick(dataGenderChart, options)}
              />
            </div>
              <ChartModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                chartData={selectedChartData}
                chartOptions={selectedChartOptions}
              />
            <div  onClick={() => handleChartClick(lineLabels, options)} className="bg-white h-1/3 rounded-3xl flex-cols items-center justify-center font-black shadow-xl p-4">
            <h1 className="text-secondary text-xl"> Taux d’attrition/âge </h1>
            <LineGraph labels={lineLabels} datasets={lindeData} />
            </div>
            <ChartModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                chartData={selectedChartData}
                chartOptions={selectedChartOptions}
              />
            <div  onClick={() => handleChartClick(dataJobChart, options)} className="bg-white h-1/3 rounded-3xl flex-cols items-center justify-center font-black shadow-xl p-4">
            <h1 className="text-secondary text-xl"> Taux d’attrition/job </h1>
            <BarChart
                data={dataJobChart}
                options={options}
                onClick={() => handleChartClick(dataJobChart, options)}
              />
            </div>
            <ChartModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                chartData={selectedChartData}
                chartOptions={selectedChartOptions}
              />
          </div>
          <div className="bg-white rounded-3xl w-1.5/6 font-black shadow-xl p-8">
          <LastFiveUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scenario1;
