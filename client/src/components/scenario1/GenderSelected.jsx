import { useState, React } from 'react';
const GenderSelected = () => {
    const [gender, setGender] = useState(null);
  return (
    <div className="bg-white text-secondary  h-28 rounded-xl p-2 flex items-center justify-between w-68 xl:w-52 lg:52 shadow-xl">
    {gender === null && (
      <div className="flex items-center gap-8 w-54 xl:w-54 mx-auto">
        <button onClick={() => setGender("homme")}>
          <img src="Male.png" draggable={false} />
        </button>
        <div className="text-5xl">|</div>
        <button
          className="cursor-pointer"
          onClick={() => setGender("femme")}
        >
          <img src="Female.png" draggable={false} />
        </button>
      </div>
    )}
    {gender !== null && (
      <div className="mx-auto">
        {gender === "homme" && (
          <button
            className="cursor-pointer"
            onClick={() => setGender(null)}
          >
            <img src="Male.png" draggable={false} />
          </button>
        )}
        {gender === "femme" && (
          <button
            className="cursor-pointer"
            onClick={() => setGender(null)}
          >
            <img src="Female.png" draggable={false} />
          </button>
        )}
      </div>
    )}
  </div>
  )
}

export default GenderSelected
