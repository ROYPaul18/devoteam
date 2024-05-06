import React, { useEffect, useState } from "react";

function LastFiveUsers() {
  const [lastFiveUsers, setLastFiveUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:3001/api/nombre_personnes"
      );
      const data = await response.json();
      setLastFiveUsers(data.lastFiveEndDates);
    }
    fetchData();
  }, []);

  return (
    <div className="flex-col justify-between">
      <h2 className="text-secondary text-xl mb-12 text-center">
      Caractéristiques des 5 dernières
 démissions
      </h2>
      <ul>
        {lastFiveUsers.map((user, index) => (
          <li className={`border-b-4 border-solid border-secondary ${index === lastFiveUsers.length - 1 ? "border-b-0" : "mb-4"}`} key={index}>
              <div className="flex">
                <p className="text-purpleRed mr-1">{user.id} John Doe</p>
                <p className="text-purpleRed">45 ans</p>
                <p className="ml-1"> {user.os_departement ? user.os_departement : "Inconnu"} </p>
              </div>
              {/* <p>Date de début : {user.start_date}</p>
              <p>Date de fin : {user.end_date}</p> */}
              {/* <p>Genre : {user.gender}</p> */}
              <li>
                <p>. Location : {user.location ? user.location : "Inconnu"} </p>
                <p>. Âge à l'entrée : {user.entry_age ? user.entry_age : "Inconnu"} </p>
                <p>. Salaire : {user.salary ? user.salary : "Inconnu"} €</p>
              </li>
           
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LastFiveUsers;
