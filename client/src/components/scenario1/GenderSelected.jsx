import { useState, useEffect } from 'react';

const GenderSelected = ({ onGenderSelect, onFilterChange }) => {
  // Initialiser l'état avec la valeur de localStorage si disponible
  const [gender, setGender] = useState(() => {
    const savedGender = localStorage.getItem('selectedGender');
    return savedGender || '';
  });

  // Mettre à jour localStorage chaque fois que le genre change
  useEffect(() => {
    localStorage.setItem('selectedGender', gender);
  }, [gender]);

  const handleGenderClick = (selectedGender) => {
    console.log(`Gender changed to: ${selectedGender}`);
    setGender(selectedGender);
    onGenderSelect(selectedGender);
    onFilterChange('gender', selectedGender === '' ? null : selectedGender);
  };

  return (
    <div className="bg-white text-secondary h-28 rounded-xl p-2 flex items-center justify-around w-68 xl:w-52 lg:w-52 shadow-xl">
      {gender === '' ? (
        <div className="flex items-center gap-6 w-54 xl:w-54 mx-auto">
          <button onClick={() => handleGenderClick("Male")}>
            <img src="Male.png" alt="Male" draggable={false} />
          </button>
          <div className="text-5xl h-full">|</div>
          <button onClick={() => handleGenderClick("Female")}>
            <img src="Female.png" alt="Female" draggable={false} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-6 w-54 xl:w-54 mx-auto">
          <button onClick={() => handleGenderClick('')}>
            <img src={gender === "Male" ? "Male.png" : "Female.png"} alt={gender} draggable={false} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GenderSelected;