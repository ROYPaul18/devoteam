import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../../App.css';

const DateRangeComp = ({ onDateRangeChange }) => {
  const initialStartDate = new Date(2006, 0, 1);
  const currentDate = new Date();
  const savedRange = JSON.parse(localStorage.getItem('dateRange')) || {
    startDate: initialStartDate,
    endDate: currentDate,
  };

  const [range, setRange] = useState([
    {
      startDate: new Date(savedRange.startDate),
      endDate: new Date(savedRange.endDate),
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
    const newRange = {
      startDate: item.selection.startDate,
      endDate: item.selection.endDate,
    };

    setRange([
      {
        startDate: newRange.startDate,
        endDate: newRange.endDate,
        key: 'selection',
      },
    ]);

    localStorage.setItem('dateRange', JSON.stringify(newRange));

    const formattedStartDate = format(newRange.startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(newRange.endDate, 'yyyy-MM-dd');
    onDateRangeChange({ start: formattedStartDate, end: formattedEndDate });
  };

  return (
    <div className="calendarWrap w-full">
      <input
        value={`${format(range[0].startDate, 'yyyy-MM-dd')} / ${format(range[0].endDate, 'yyyy-MM-dd')}`}
        readOnly
        className="font-bold text-xl bg-secondary text-white text-start rounded-md p-4 w-full md:w-auto"
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
            minDate={initialStartDate}
            maxDate={currentDate}
          />
        )}
      </div>
    </div>
  );
  
};

export default DateRangeComp;
