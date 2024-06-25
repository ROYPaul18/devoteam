import React, { useEffect, useState } from "react";
import UserAccordion from "./UserAccordion";

function LastFiveUsers() {
  const [lastFiveUsers, setLastFiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:3001/api/last_five_end_dates"
      );
      const data = await response.json();
      setLastFiveUsers(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="flex-col justify-between">
      <h2 className="text-secondary text-base 2xl:text-xl mb-1 2xl:mb-8 text-center">
        Caractéristiques des 5 dernières  démissions
      </h2>
      {loading ? (
        Array.from({ length: 5 }, (_, i) => (
          <UserAccordion loading={true} key={i} />
        ))
      ) : (
        <ul>
          {lastFiveUsers.map((user, index) => (
            <UserAccordion
              user={user}
              loading={false}
              key={user.id}
              className={`border-b-4 border-solid border-secondary ${
                index === lastFiveUsers.length - 1 ? "border-b-0" : "mb-4"
              }`}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default LastFiveUsers;
