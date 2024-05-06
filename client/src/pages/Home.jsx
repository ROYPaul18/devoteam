import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="bg-primary h-screen px-16 lg:px-8 py-2">
      <div className="flex items-center">
        <img src="Logo.png" alt="" srcset="" />
        <h1 className="text-secondary text-5xl font-black"> KPI DASHBOARD</h1>
      </div>

      <div className="mt-20 m-auto">
        <div className="grid grid-cols-3 gap-12 p-4">
          <Link
            to="/scenario_un"
            className="bg-blue-500 text-white p-4 rounded-lg h-60 w-full xl:max-h-52 2xl:max-h-80 flex items-center justify-center"
          >
            <div className="m-auto">
              <h1 className="text-3xl"> Scénario 0 </h1>
            </div>
          </Link>

          <Link
            to="/scenario_deux"
            className="bg-red-500 text-white p-4 w-full rounded-lg h-60 xl:max-h-52 2xl:max-h-80 flex items-center justify-center"
          >
            <div className="m-auto">
              <h1 className="text-3xl"> Scénario 1 </h1>
            </div>
          </Link>

          <Link
            to="/scenario_trois"
            className="bg-green-500 text-white p-4 rounded-lg h-60 w-full xl:max-h-52 2xl:max-h-80 flex items-center justify-center"
          >
            <div className="m-auto">
              <h1 className="text-3xl"> Scénario 2 </h1>
            </div>
          </Link>
        </div>
        <div className="flex justify-center items-center mt-8 gap-12">
          <Link
            to="/scenario_quatre"
            className="bg-yellow-500 text-white p-4  rounded-lg w-1/3 h-60 xl:max-h-52 2xl:max-h-80 flex items-center justify-center"
          >
           <div className="m-auto">
              <h1 className="text-3xl"> Scénario 3 </h1>
            </div>
          </Link>
          <Link
            to="/page5"
            className="bg-purple-500 text-white p-4 w-1/3 rounded-lg h-60 xl:max-h-52 2xl:max-h-80 flex items-center justify-center"
          >
            <div className="m-auto">
              <h1 className="text-3xl"> Scénario 4 </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
