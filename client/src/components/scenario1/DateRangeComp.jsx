import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../../App.css';

const DateRangeComp = ({ onDateRangeChange }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  const [open, setOpen] = useState(false);
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleRangeChange = (item) => {
    setRange([item.selection]);
    const formattedStartDate = format(item.selection.startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(item.selection.endDate, 'yyyy-MM-dd');
    console.log(`Date range selected: ${formattedStartDate} to ${formattedEndDate}`);
    onDateRangeChange([formattedStartDate, formattedEndDate]);
  };

  return (
    <div className="calendarWrap">
      <input
        value={`${format(range[0].startDate, 'yyyy-MM-dd')} / ${format(range[0].endDate, 'yyyy-MM-dd')}`}
        readOnly
        className="font-bold text-xl px-8 py-4 bg-secondary text-white w-full" // Ajout de w-full pour la largeur complète
        onClick={() => setOpen((open) => !open)}
       
      />
      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={handleRangeChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement w-full"
            rangeColors={['#f33e5b', '#3ecf8e', '#fed14c']}
          />
        )}
      </div>
    </div>
  );
};

export default DateRangeComp;