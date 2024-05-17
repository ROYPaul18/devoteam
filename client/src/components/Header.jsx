import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  let scenarioTitle = "";
  let scenarioPath = "/";
  let scenarioInfo = "";

  switch (location.pathname) {
    case "/scenario_un":
      scenarioTitle = "Scénario 1";
      scenarioPath = "/scenario_un";
      scenarioInfo = "Taux d'attrition";
      break;
    case "/scenario_deux":
      scenarioTitle = "Scénario 2";
      scenarioPath = "/scenario_deux";
      scenarioInfo = "Taux d'attrition 2";
      break;
    case "/scenario_trois":
      scenarioTitle = "Scénario 3";
      scenarioPath = "/scenario_trois";
      scenarioInfo = "Taux d'attrition 3";
      break;
    case "/scenario_quatre":
      scenarioTitle = "Scénario 4";
      scenarioPath = "/scenario_quatre";
      scenarioInfo = "Taux d'attrition 4";
      break;
    default:
      scenarioTitle = "Home";
  }

  const handleScenarioChange = (event) => {
    const selectedScenarioPath = event.target.value;
    window.location.href = selectedScenarioPath;
  };

  return (
    <div className="mr-12">
      <header className="flex items-center">
        <div className="flex items-center">
          <Link to={"/"}>
            <img src="Logo.png" width={130} height={130} alt="Logo" />
          </Link>
          <div className="relative w-fit">
            <select
              value={scenarioPath}
              onChange={handleScenarioChange}
              className="appearance-none text-secondary text-3xl font-black bg-transparent pr-4 pl-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            >
              <option value="/scenario_un">Taux d'attrition </option>
              <option value="/scenario_deux">Employés à risques</option>
              <option value="/scenario_trois">Levier à activer</option>
              <option value="/scenario_quatre">Population à risque</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center mx-1 text-secondary">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
