import React, { useState } from "react";
import locationInverse from './utils/locationInverse';

const UserAccordion = ({ user }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const getLocationName = (locationCode) => {
    const countryCode = locationInverse(locationCode);
    return countryCode || "Inconnu";
};

  return (
    <div className="p-5 border-solid solid border-b-2 border-secondary">
      <div className="flex justify-between ">
        <div onClick={() => setAccordionOpen(!accordionOpen)} className="flex-cols ">
          <p className="text-purpleRed-200 font-black mr-1 text-xl">
            {user.id ? user.id : "Inconnu"} {user.gender ? user.gender : "Inconnu"} 
          </p>
          <p className="text-purpleRed-100 font-bold text-lg">
            {user.os_partner ? user.os_partner : "Inconnu"} ({user.os_rank ? user.os_rank : "Inconnu"}){" "}
          </p>
        </div>
        <button onClick={() => setAccordionOpen(!accordionOpen)}>
          {accordionOpen ? (
            <span className="text-secondary text-sm">-</span>
          ) : (
            <span className="text-secondary text-sm">+</span>
          )}
        </button>
      </div>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <li className="overflow-hidden text-sm">
          <p> - Location : {getLocationName(user.location)} </p>
          <p> - Âge à l'entrée : {user.entry_age ? user.entry_age : "Inconnu"} </p>
          <p> - Salaire : {user.salary ? user.salary : "Inconnu"} €</p>
        </li>
      </div>
    </div>
  );
};

export default UserAccordion;