import React, { useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import locationInverse from './utils/locationInverse';

const UserAccordion = ({ user, loading }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const getLocationName = (locationCode) => {
    const countryCode = locationInverse(locationCode);
    return countryCode || "Inconnu";
  };

  return (
    <div className="p-5 border-solid solid border-b-2 border-secondary">
      {loading ? (
        <Skeleton width={200} baseColor="#FFE1E1" highlightColor="#FFE1E1"/>
      ) : (
        <div className="flex justify-between ">
          <div onClick={() => setAccordionOpen(!accordionOpen)} className="flex-cols ">
            <p className="text-purpleRed-200 font-black mr-1 text-xl">
              {loading ? <Skeleton width={200} baseColor="#FFE1E1" highlightColor="#FFE1E1"/> : `${user.id ? user.id : "Inconnu"} ${user.gender ? user.gender : "Inconnu"}`}
            </p>
            <p className="text-purpleRed-100 font-bold text-lg">
              {loading ? <Skeleton width={200} baseColor="#FFE1E1" highlightColor="#FFE1E1"/> : `${user.os_partner ? user.os_partner : "Inconnu"} (${user.os_rank ? user.os_rank : "Inconnu"})`}
            </p>
          </div>
          <button onClick={() => setAccordionOpen(!accordionOpen)}>
            {loading ? <Skeleton width={20} baseColor="#FFE1E1" highlightColor="#FFE1E1"/> : (
              accordionOpen ? (
                <span className="text-secondary text-sm">-</span>
              ) : (
                <span className="text-secondary text-sm">+</span>
              )
            )}
          </button>
        </div>
      )}

      {loading ? (
        <Skeleton width={200} baseColor="#FFE1E1" highlightColor="#FFE1E1"/>
      ) : (
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
            accordionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <li className="overflow-hidden text-sm">
            <p> - Location : {loading ? <Skeleton width={100} baseColor="#FFE1E1" highlightColor="#FFE1E1"/> : getLocationName(user.location)} </p>
            <p> - Âge à l'entrée : {loading ? <Skeleton width={50} baseColor="#FFE1E1" highlightColor="#FFE1E1"/> : (user.entry_age ? user.entry_age : "Inconnu")} </p>
            <p> - Salaire : {loading ? <Skeleton width={80} baseColor="#FFE1E1" highlightColor="#FFE1E1"/> : (user.salary ? user.salary : "Inconnu")} €</p>
          </li>
        </div>
      )}
    </div>
  );
};

export default UserAccordion;
