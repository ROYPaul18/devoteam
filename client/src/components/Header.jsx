import React from "react";
import { Link } from "react-router-dom";
const Header = () => {

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center">
        <Link to={"/"}>
          <img src="/Logo.png" width={100} height={100} />

        </Link>
      </div>
      <div className="flex gap-10 mr-10">
        <Link to={"/scenario_un"}> Scénario 1</Link>
        <Link to={"/scenario_deux"}> Scénario 2</Link>
        <Link to={"/scenario_trois"}> Scénario 3</Link>
        <Link to={"/scenario_quatre"}> Scénario 4</Link>
      </div>
    </header>
  );
};

export default Header;
