import { format, addDays } from 'date-fns';

const generateDateRange = (startDate, endDate) => {
  let dates = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dates.push(format(currentDate, 'yyyy-MM-dd'));
    currentDate = addDays(currentDate, 1);
  }
  return dates;
};

export default generateDateRange;