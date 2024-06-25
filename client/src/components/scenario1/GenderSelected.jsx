import { useState, useEffect } from 'react';

const GenderSelected = ({ onGenderSelect, onFilterChange }) => {
  
  const [gender, setGender] = useState(() => {
    const savedGender = localStorage.getItem('selectedGender');
    return savedGender || '';
  });
  
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
    <>
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
    </>
  );
};

export default GenderSelected;