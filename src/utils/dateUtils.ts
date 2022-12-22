export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.toISOString().split('T')[0] === date2.toISOString().split('T')[0]
  );
};

export const isBetweenDay = (date: Date, startDate: Date, endDate: Date) => {
  const d = new Date(date.toISOString().split('T')[0]).getTime();
  const sD = new Date(startDate.toISOString().split('T')[0]).getTime();
  const eD = new Date(endDate.toISOString().split('T')[0]).getTime();
  return sD <= d && d <= eD;
};

export const getDateTerm = (startDate: Date, endDate: Date) => {
  const startDateMidnight = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const endDateMidnight = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  return (endDateMidnight.getTime() - startDateMidnight.getTime()) / 86400000;
};

export const getDateStartToLast = (startDate: Date, lastDate: Date) => {
  const result = [];
  while (startDate <= lastDate) {
    result.push(startDate.toISOString().split('T')[0]);
    startDate.setDate(startDate.getDate() + 1);
  }
  return result;
};
