import React, { useEffect, useState } from "react";
import UserAccordion from "./UserAccordion";

function LastFiveUsers() {
  const [lastFiveUsers, setLastFiveUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:3001/api/last_five_end_dates"
      );
      const data = await response.json();
      setLastFiveUsers(data);
    }
    fetchData();
  }, []);

  return (
    <div className="flex-col justify-between">
      <h2 className="text-secondary text-xl mb-8 text-center">
        Caractéristiques des 5 dernières  démissions
      </h2>
      <ul>
        {lastFiveUsers.map((user, index) => (
          <UserAccordion
            user={user}
            key={user.id}
            className={`border-b-4 border-solid border-secondary ${
              index === lastFiveUsers.length - 1 ? "border-b-0" : "mb-4"
            }`}
          />
        ))}
      </ul>
    </div>
  );
}

export default LastFiveUsers;
