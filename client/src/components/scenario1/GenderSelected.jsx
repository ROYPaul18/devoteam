import { useState } from 'react';

const GenderSelected = ({ onGenderSelect, onFilterChange, props }) => {
  const [gender, setGender] = useState('');

  const handleGenderChange = (newGender) => {
    console.log(`Gender changed to: ${newGender}`);
    setGender(newGender);
    onFilterChange('gender', newGender === '' ? null : newGender);
  };

  const handleGenderSelect = (gender) => {
    setGender(gender);
    onGenderSelect(gender);
    onFilterChange('gender', gender === '' ? null : gender);
  };

  return (
    <div className="bg-white text-secondary h-28 rounded-xl p-2 flex items-center justify-around w-68 xl:w-52 lg:w-52 shadow-xl ">
      {gender === '' ? (
        <div className="flex items-center gap-6 w-54 xl:w-54 mx-auto">
          <button onClick={() => { handleGenderChange("Male", props); handleGenderSelect("Male"); }}>
            <img src="Male.png" alt="Male" draggable={false} />
          </button>
          <div className="text-5xl h-full">|</div>
          <button onClick={() => { handleGenderChange("Female", props); handleGenderSelect("Female"); }}>
            <img src="Female.png" alt="Female" draggable={false} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-6 w-54 xl:w-54 mx-auto">
          <button onClick={() => handleGenderChange('')}>
            <img src={gender === "Male" ? "Male.png" : "Female.png"} alt={gender} draggable={false} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GenderSelected;