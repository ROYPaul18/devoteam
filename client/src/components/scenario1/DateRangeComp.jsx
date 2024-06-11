import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../../App.css';

const DateRangeComp = ({ onDateRangeChange }) => {
 
  const initialStartDate = new Date(2006, 0, 1); 
  const currentDate = new Date(); 

  const [range, setRange] = useState([
    {
      startDate: initialStartDate,
      endDate: addDays(initialStartDate, 7),
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
    <div className="calendarWrap" style={{ width: '100%' }}>
      <input
        value={`${format(range[0].startDate, 'yyyy-MM-dd')} / ${format(range[0].endDate, 'yyyy-MM-dd')}`}
        readOnly
        className="font-bold text-xl bg-secondary text-white text-start rounded-md"
        onClick={() => setOpen((open) => !open)}
        style={{ padding: '16px 24px', width: '100%' }} 
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
            minDate={initialStartDate} // Date de début minimale
            maxDate={currentDate} // Date de fin maximale
          />
        )}
      </div>
    </div>
  );
};

export default DateRangeComp;