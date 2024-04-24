import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'

import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import '../../App.css'
const DateRangeComp = () => {

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])

  const [open, setOpen] = useState(false)
  const refOne = useRef(null)


  useEffect(() => {  
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])
 
  const hideOnEscape = (e) => {
    // console.log(e.key)s
    if( e.key === "Escape" ) {
      setOpen(false)
    }
  }
  const hideOnClickOutside = (e) => {

    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }

  return (
    <div className="calendarWrap">

      <input
        value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
        readOnly
        className="inputBox"
        onClick={ () => setOpen(open => !open) }
      />
      <div ref={refOne}>
        {open && 
          <DateRange
            onChange={item => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement"
            rangeColors={['#f33e5b', '#3ecf8e', '#fed14c']}
            
          />
        }
      </div>

    </div>
  )
}

export default DateRangeComp;