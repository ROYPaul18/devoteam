import React, { useState, useEffect } from "react";
import axios from "axios";

const AgeOptions = ({ onAgeRangesChange }) => {
  const [entryAges, setEntryAges] = useState([]);
  const [checkedEntryAges, setCheckedEntryAges] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/entry-ages"
        );
        const filteredEntryAges = response.data.filter((age) => age !== null);
        filteredEntryAges.unshift(null);
        setEntryAges(filteredEntryAges);

        const savedCheckedEntryAges = JSON.parse(
          localStorage.getItem("checkedEntryAges")
        );
        if (savedCheckedEntryAges && savedCheckedEntryAges.length > 0) {
          setCheckedEntryAges(savedCheckedEntryAges);
        } else {
          setCheckedEntryAges(
            filteredEntryAges.map((age) => ({ age, checked: true }))
          );
        }
      } catch (error) {
        console.error("Error fetching entry ages:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("checkedEntryAges", JSON.stringify(checkedEntryAges));
    onAgeRangesChange(
      checkedEntryAges
        .filter((entryAge) => entryAge.checked)
        .map((entryAge) => entryAge.age)
    );
  }, [checkedEntryAges]);

  const handleCheckboxChange = (age) => {
    setCheckedEntryAges((prevState) =>
      prevState.map((entryAge) =>
        entryAge.age === age
          ? { ...entryAge, checked: !entryAge.checked }
          : entryAge
      )
    );
  };

  const handleOpenModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  const toggleAllAges = (selectAll) => {
    setCheckedEntryAges(entryAges.map((age) => ({ age, checked: selectAll })));
  };

  const renderCheckboxes = () =>
    checkedEntryAges.map((entryAge, index) => (
      <div
        key={index}
        className="flex items-center mb-2 border-b border-gray-300 pb-2 checkbox-row"
      >
        <input
          type="checkbox"
          id={`entry-age-${entryAge.age === null ? "inconnue" : entryAge.age}`}
          checked={entryAge.checked}
          onChange={() => handleCheckboxChange(entryAge.age)}
          className="mr-2 h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-red-500 border-2 border-red-500 bg-gray-200 focus:ring-red-500 accent-secondary rounded-md"
        />
        <label
          className="text-sm lg:text-base xl:text-lg"
          htmlFor={`entry-age-${
            entryAge.age === null ? "inconnue" : entryAge.age
          }`}
        >
          {entryAge.age === null ? "Inconnue" : entryAge.age}
        </label>
      </div>
    ));

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="age-filter-button bg-secondary text-white font-medium rounded-md w-full md:w-auto transition-all duration-300 p-8 md:p-2 text-sm md:text-base lg:texte-lg 2xl:text-xl"
      >
        Filtre les tranches d'âges
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
          <div className="bg-white text-black w-72 md:w-80 lg:w-96 h-auto rounded-lg p-4 lg:p-6 flex flex-col justify-center shadow-xl">
            <div className="flex-grow max-h-60 lg:max-h-80 overflow-y-auto">
              {renderCheckboxes()}
            </div>
            <div className="flex justify-between gap-2 mt-4">
              <button
                onClick={() => toggleAllAges(false)}
                className="bg-red-500 text-white px-2 py-1 lg:px-3 lg:py-2 rounded text-xs lg:text-sm"
              >
                Tout désélectionner
              </button>
              <button
                onClick={() => toggleAllAges(true)}
                className="bg-green-500 text-white px-2 py-1 lg:px-3 lg:py-2 rounded text-xs lg:text-sm"
              >
                Tout sélectionner
              </button>
            </div>
            <button
              onClick={handleCloseModal}
              className="bg-secondary text-white px-4 py-2 lg:px-6 lg:py-3 rounded mt-4 text-sm lg:text-base"
            >
              Valider
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AgeOptions;
