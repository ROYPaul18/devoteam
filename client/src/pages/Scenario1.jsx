import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Box, Typography, Slider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Input } from "@mui/material";

const Scenario1 = () => {
  const [objectCount, setObjectCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gender, setGender] = useState(null);
  const [temperatureRange, setTemperatureRange] = useState([18, 65]);

  const [nombreDeLignes, setNombreDeLignes] = useState(null);

  useEffect(() => {
    
    axios.get('http://localhost:3001/api/data')
      .then(response => {
        const { nombreDeLignes } = response.data;
        setNombreDeLignes(nombreDeLignes);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      });
  }, []); 

  useEffect(() => {
    const fetchObjectCount = async () => {
      try {
        const response = await axios.get("/api/data");
        const count = Object.keys(response.data).length;
        setObjectCount(count);
      } catch (error) {
        console.error("Error fetching object count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchObjectCount();
  }, []);

  const handleGenderClick = (selectedGender) => {
    setGender(selectedGender === gender ? null : selectedGender);
  };

  const handleTemperatureChange = (event, newValue) => {
    setTemperatureRange(newValue);
  };

  return (
    <div className="bg-primary px-4 py-2 gap-10 md:gap-1 min-h-screen">
      <Header />
      <nav className="flex items-center justify-center gap-16">
        <div className="bg-white text-secondary w-96 h-24 rounded-3xl p-2 flex items-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                "& .MuiDateCalendar-root": {
                  color: "red",
                  borderRadius: "2px",
                  borderWidth: "1px",
                  borderColor: "#e91e63",
                  borderStyle: "solid",
                  backgroundColor: "red",
                },
              }}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
          </LocalizationProvider>
        </div>
        <div className="bg-white text-secondary w-96 h-24 rounded-3xl p-2">
          Country label
        </div>
        <div className="bg-white text-secondary w-96 h-24 rounded-3xl p-2 flex-cols justify-center">
          <div className="mb-4">
            <Input
              value={temperatureRange[0]}
              onChange={(e) =>
                setTemperatureRange([
                  parseInt(e.target.value),
                  temperatureRange[1],
                ])
              }
              className="bg-white font-secondary flex justify-center border-solid border-2 border-secondary text-gray-800"
            />
            <Input
              value={temperatureRange[1]}
              onChange={(e) =>
                setTemperatureRange([
                  temperatureRange[0],
                  parseInt(e.target.value),
                ])
              }
              className="bg-white font-secondary flex justify-center border-solid border-2 border-secondary text-gray-800"
            />
          </div>
          <Slider
            value={temperatureRange}
            onChange={handleTemperatureChange}
            valueLabelDisplay="auto"
            color="attrition"
          />
        </div>
        <div className="bg-white text-secondary w-96 h-24 rounded-3xl p-2 flex items-center justify-between ">
          {gender === null && (
            <div className="flex items-center gap-8 mx-auto">
              <button onClick={() => setGender("homme")}>
                <img src="Male.png" draggable={false} />{" "}
              </button>
              <div className="text-5xl"> | </div>
              <button onClick={() => setGender("femme")}>
                <img src="Female.png" draggable={false} />
              </button>
            </div>
          )}
          {gender !== null && (
            <div className="mx-auto">
              {gender === "homme" && (
                <button onClick={() => setGender(null)}>
                  <img src="Male.png" draggable={false} />
                </button>
              )}
              {gender === "femme" && (
                <button onClick={() => setGender(null)}>
                  <img src="Female.png" draggable={false} />
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="flex 2xl:mt-16 xl:mt-12">
        {/* Left Part */}
        <div className="flex flex-col gap-y-16">
          <div className="bg-attrition-100 w-56 2xl:w-60 h-1/3 xl:h-44 rounded-3xl p-5 shadow-md hover:shadow-xl">
            <h1 className="text-attrition-200"> Taux d'attrition </h1>
          </div>
          <div className="bg-depart-100 w-56 2xl:w-60 h-1/3 xl:h-44 rounded-3xl p-5 shadow-md hover:shadow-xl">
            <h1 className="text-depart-200"> Nombre de départ </h1>
          </div>
          <div className="bg-employe-100 w-56 2xl:w-60 h-1/3 xl:h-44 rounded-3xl p-3 shadow-md hover:shadow-xl">
            <h1 className="text-employe-200"> Nombre d'employé : </h1>
          
      {nombreDeLignes !== null && (
        <p>Nombre de lignes dans le fichier CSV : {nombreDeLignes}</p>
      )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-6 h-6 text-employe-200 font-black flex justify-end"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        </div>

        {/* Right Part */}
        <div className="ml-20 flex gap-10 w-full">
          <div className="flex flex-col gap-10 w-full 2xl:gap-10">
            <div className="bg-white h-1/2 rounded-3xl flex items-center justify-center font-black">
              Taux d’attrition par départements, pays
            </div>
            <div className="bg-white h-1/2 rounded-3xl flex items-center justify-center font-black">
              Histogrammes du nombre d’attrition par semaines, mois, trimestre,
              année
            </div>
          </div>

          <div className="flex flex-col gap-10 w-full">
            <div className="bg-white h-1/3 rounded-3xl flex items-center justify-center font-black">
              Taux d’attrition/Genre
            </div>
            <div className="bg-white h-1/3 rounded-3xl flex items-center justify-center font-black">
              Taux d’attrition/Âge
            </div>
            <div className="bg-white h-1/3 rounded-3xl flex items-center justify-center font-black">
              Taux d’attrition/Jobs
            </div>
          </div>

          <div className="bg-white rounded-3xl w-full flex items-center justify-center font-black">
            Caractéristiques des 5 dernières démissions
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scenario1;
