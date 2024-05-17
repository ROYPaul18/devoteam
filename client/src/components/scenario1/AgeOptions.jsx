import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgeOptions = ({ onAgeRangesChange }) => {
  const [entryAges, setEntryAges] = useState([]);
  const [checkedEntryAges, setCheckedEntryAges] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/api/entry-ages');
      const filteredEntryAges = response.data.filter((age) => age !== null);
      setEntryAges(filteredEntryAges);
      setCheckedEntryAges(filteredEntryAges.map((age) => ({ age, checked: true })));
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (age) => {
    setCheckedEntryAges((prevState) => {
      const updatedEntryAges = prevState.map((entryAge) =>
        entryAge.age === age ? { ...entryAge, checked: !entryAge.checked } : entryAge
      );
      onAgeRangesChange(getCheckedAgeRanges(updatedEntryAges));
      return updatedEntryAges;
    });
  };

  const handleOpenModal = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const getCheckedAgeRanges = (checkedEntryAges) => {
    return checkedEntryAges
      .filter((entryAge) => entryAge.checked && entryAge.age !== null && entryAge.age !== 'NaN-NaN')
      .map((entryAge) => {
        const [start, end] = entryAge.age.split('-');
        if (end === 'NaN' || isNaN(parseInt(end, 10))) {
          return '60+';
        } else {
          const endNum = parseInt(end, 10);
          return `${start}-${endNum}`;
        }
      });
  };

  const renderCheckboxes = () => {
    return checkedEntryAges.map((entryAge, index) => (
      <div key={index} className="flex items-center mb-2 border-b border-gray-300 pb-2">
        <input
          type="checkbox"
          id={`entry-age-${entryAge.age}`}
          checked={entryAge.checked}
          onChange={() => handleCheckboxChange(entryAge.age)}
          className="mr-2"
        />
        <label className="text-2xl" htmlFor={`entry-age-${entryAge.age}`}>{entryAge.age}</label>
      </div>
    ));
  };

  return (
    <>
      <button onClick={handleOpenModal} className="bg-secondary text-white font-bold text-xl px-8 py-4 rounded">
        Filtre les tanches d'âges
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
          <div className="bg-white text-secondary w-80 xl:w-68 lg:68 h-auto rounded-xl p-2 flex-cols justify-center shadow-xl">
            <div className="flex flex-col">
              <div className="flex-grow">{renderCheckboxes()}</div>
              <button onClick={handleCloseModal} className="bg-secondary text-white px-4 py-2 rounded mt-2">
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgeOptions;
