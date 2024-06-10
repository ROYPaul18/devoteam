import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgeOptions = ({ onAgeRangesChange }) => {
  const [entryAges, setEntryAges] = useState([]);
  const [checkedEntryAges, setCheckedEntryAges] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/entry-ages');
        const filteredEntryAges = response.data.filter((age) => age !== null);
        filteredEntryAges.unshift(null); // Add "Inconnue" option at the beginning
        setEntryAges(filteredEntryAges);  
        
        const savedCheckedEntryAges = JSON.parse(localStorage.getItem('checkedEntryAges'));
        if (savedCheckedEntryAges && savedCheckedEntryAges.length > 0) {
          setCheckedEntryAges(savedCheckedEntryAges);
        } else {
          setCheckedEntryAges(filteredEntryAges.map((age) => ({ age, checked: true })));
        }
      } catch (error) {
        console.error('Error fetching entry ages:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('checkedEntryAges', JSON.stringify(checkedEntryAges));
    onAgeRangesChange(checkedEntryAges.filter(entryAge => entryAge.checked).map(entryAge => entryAge.age));
  }, [checkedEntryAges]);

  const handleCheckboxChange = (age) => {
    setCheckedEntryAges((prevState) => {
      const updatedEntryAges = prevState.map((entryAge) =>
        entryAge.age === age ? { ...entryAge, checked: !entryAge.checked } : entryAge
      );
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

  const toggleAllAges = (selectAll) => {
    setCheckedEntryAges(entryAges.map(age => ({
      age,
      checked: selectAll
    })));
  };

  const renderCheckboxes = () => {
    return checkedEntryAges.map((entryAge, index) => (
      <div key={index} className="flex items-center mb-2 border-b border-gray-300 pb-2 checkbox-row">
        <input
          type="checkbox"
          id={`entry-age-${entryAge.age === null ? 'inconnue' : entryAge.age}`}
          checked={entryAge.checked}
          onChange={() => handleCheckboxChange(entryAge.age)}
          className="mr-2 h-6 w-6 text-red-500 border-2 border-red-500 bg-gray-200 focus:ring-red-500 accent-secondary rounded-lg"
        />
        <label className="text-2xl" htmlFor={`entry-age-${entryAge.age === null ? 'inconnue' : entryAge.age}`}>
          {entryAge.age === null ? 'Inconnue' : entryAge.age}
        </label>
      </div>
    ));
  };

  return (
    <>
      <button onClick={handleOpenModal} className="bg-secondary text-white font-bold text-xl px-8 py-4 rounded">
        Filtre les tranches d'âges
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
          <div className="bg-white text-black w-80 xl:w-68 lg:68 h-auto rounded-xl p-2 flex-cols justify-center shadow-xl border-2 border-black">
            <div className="flex flex-col">
              <div className="flex-grow">
                {renderCheckboxes()}
              </div>
              <div className="flex justify-between gap-2">
                <button onClick={() => toggleAllAges(false)} className="bg-red-500 text-white px-3 py-1 rounded text-sm ml-2">
                  Tout désélectionner
                </button> 
                <button onClick={() => toggleAllAges(true)} className="bg-green-500 text-white px-3 py-1 rounded text-sm mr-2">
                  Tout sélectionner
                </button>
              </div>
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