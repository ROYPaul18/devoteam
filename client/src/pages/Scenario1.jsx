import React from "react";
import Filter from "./../components/scenario1/Filter";
import ListInfo from "../components/scenario1/ListInfo";
import BarChart from "../components/scenario1/graph/BarChart";
import { useState } from "react";
import ChartModal from "../components/scenario1/ChartModal";
import LastFiveUsers from "../components/scenario1/LastFiveUsers";
import LineGraph from "../components/scenario1/graph/LineGraph";
import AttrCountryGraph from "../components/scenario1/graph/AttrCountryGraph";
import AttrJobGraph from "../components/scenario1/graph/AttrJobGraph";
import AttrByWeMoTriYe from "../components/scenario1/graph/AttrByWeMoTriYe";
// import AttrGenderGraph from "../components/scenario1/graph/AttrGenderGraph";
import AttrAgeGraph from "../components/scenario1/graph/AttrAgeGraph";

const Scenario1 = () => {
  const [selectedChartData, setSelectedChartData] = useState(null);
  const [selectedChartOptions, setSelectedChartOptions] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChartClick = (chartData, chartOptions) => {
    setSelectedChartData(chartData);
    setSelectedChartOptions(chartOptions);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="bg-primary">
      <div className="px-16 lg:px-8 py-2 gap-20 md:gap-1 min-h-screen">
        <div className="">
          <Filter />
        </div>
        <div id="1 " className="flex mt-4 xl:mt-12 max-h-[80vh] w-full">
          {/* Left Part */}
          <ListInfo />
          {/* Right Part */}
          <div className="ml-20 flex w-full gap-x-16">
            <div className="flex flex-col h-full gap-10 w-2/4">
              <div className="bg-white h-[37vh] rounded-3xl flex-cols items-center justify-center font-black shadow-xl p-4">
                  <AttrCountryGraph />
              </div>
              <div onClick={() =>
                    handleChartClick(FakeOtherDataChart, optionsFake)}
                     className="bg-white h-[37vh] rounded-3xl flex-cols items-center justify-center font-black shadow-xl p-4">
                <AttrByWeMoTriYe />
              </div>
              <ChartModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                chartData={selectedChartData}
                chartOptions={selectedChartOptions}
              />
            </div>

            <div className="flex flex-col gap-8 w-1/4 h-full justify-between">
              <div className="bg-white h-1/3 rounded-3xl flex-cols items-center justify-center font-black shadow-xl p-4">
                <h1 className="text-secondary text-xl">
                  {" "}
                  Taux d’attrition/Genre
                </h1>
                {/* <AttrGenderGraph /> */}
              </div>
              <ChartModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                chartData={selectedChartData}
                chartOptions={selectedChartOptions}
              />
              <div className="bg-white h-1/3 rounded-3xl flex-cols items-center justify-center font-black shadow-xl p-4">
                <h1 className="text-secondary text-xl">
                  Taux d’attrition/âge
                </h1>
                <AttrAgeGraph />
              </div>
              <ChartModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                chartData={selectedChartData}
                chartOptions={selectedChartOptions}
              />
              <div className="bg-white h-1/3 rounded-3xl flex-cols items-center justify-center font-black shadow-xl p-4">
                <h1 className="text-secondary text-xl">
                  Taux d’attrition/job
                </h1>
                <AttrJobGraph />
              </div>
              <ChartModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                chartData={selectedChartData}
                chartOptions={selectedChartOptions}
              />
            </div>
            <div className="bg-white rounded-3xl w-1/4 h-full font-black shadow-xl p-8">
              <LastFiveUsers />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scenario1;
