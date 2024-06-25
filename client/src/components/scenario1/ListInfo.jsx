import React, { useState, useEffect } from "react";
import axios from "axios";
import { Oval } from 'react-loader-spinner';

const ListInfo = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/count_objects');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { totalObjects, objectsWithEndDateNotNull, objectsWithEndDateNull, attritionRate } = data;

  return (
    <div className="flex flex-col justify-between gap-y-6 xl:gap-y-8 md:gap-x-8 my-2 py-4">
      <div className="relative bg-attrition-100 w-52 2xl:w-60 h-44 2xl:h-56 rounded-3xl p-2 shadow-md hover:shadow-xl flex flex-col justify-between">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10 rounded-2xl">
            <Oval
              height={40}
              width={40}
              color="#FF496E"
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#FF496E"
              strokeWidth={4}
              strokeWidthSecondary={4}
            />
          </div>
        )}
        <h1 className="text-attrition-200 font-extrabold mb-3 md:mb-2 text-base sm:text-sm md:text-xs lg:text-sm xl:text-base 2xl:text-lg">
          Taux d'attrition :
        </h1>
        <p className="text-6xl 2xl:text-7xl text-attrition-200 font-extrabold flex justify-center p-4 md:p-2 lg:p-4">
          {attritionRate}%
        </p>
        <div className="flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 md:w-4 md:h-4 lg:w-6 lg:h-6 text-attrition-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
            />
          </svg>
        </div>
      </div>

      <div className="relative bg-depart-100  w-52 2xl:w-60 h-44 2xl:h-56 rounded-3xl p-3 md:p-2 shadow-md hover:shadow-xl flex flex-col justify-between">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10 rounded-2xl">
            <Oval
              height={40}
              width={40}
              color="#5E9EAF"
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#5E9EAF"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        )}
        <h1 className="text-depart-200 font-extrabold mb-3 md:mb-2 text-base sm:text-sm md:text-xs lg:text-sm xl:text-base 2xl:text-lg">
          Nombre de départ :
        </h1>
        <p className="text-6xl 2xl:text-7xl text-depart-200 font-extrabold flex justify-center p-4 md:p-2 lg:p-4">
          {objectsWithEndDateNull}
        </p>
        <div className="flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 md:w-4 md:h-4 lg:w-6 lg:h-6 text-depart-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
            />
          </svg>
        </div>
      </div>

      <div className="relative bg-employe-100  w-52 2xl:w-60 h-44 2xl:h-56 rounded-3xl p-3 md:p-2 shadow-md hover:shadow-xl flex flex-col justify-between">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10 rounded-2xl">
            <Oval
              height={40}
              width={40}
              color="#FFA87D"
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#FFA87D"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        )}
        <h1 className="text-employe-200 font-extrabold mb-3 md:mb-2 text-base sm:text-sm md:text-xs lg:text-sm xl:text-base 2xl:text-lg">
          Nombre d'employés :
        </h1>
        <p className="text-6xl 2xl:text-7xl text-employe-200 font-extrabold flex justify-center p-4 md:p-2 lg:p-4">
          {objectsWithEndDateNotNull}
        </p>
        <div className="flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 md:w-4 md:h-4 lg:w-6 lg:h-6 text-employe-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ListInfo;