import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  let scenarioTitle = "";
  let scenarioPath = "/";
  let scenarioInfo ="";
  
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
        <select
          value={scenarioPath}
          onChange={handleScenarioChange}
          className="text-secondary text-3xl font-black bg-transparent">
          <option value="/">Home</option>
          <option value="/scenario_un">Taux d'attrition </option>
          <option value="/scenario_deux">Employés à risques</option>
          <option value="/scenario_trois">Levier à activer</option>
          <option value="/scenario_quatre">Population à risque</option>
        </select>
      </div>
    </header>
    </div>
  );
};

export default Header;