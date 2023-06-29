// 두 날짜 객체가 같은 날짜인지 확인
export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// 한 날짜가 startDate와 endDate 사이에 껴있는지 확인
export const isBetweenDay = (date: Date, startDate: Date, endDate: Date) => {
  const d = new Date(date.toISOString().split('T')[0]).getTime();
  const sD = new Date(startDate.toISOString().split('T')[0]).getTime();
  const eD = new Date(endDate.toISOString().split('T')[0]).getTime();
  return sD <= d && d <= eD;
};

// startDate부터 endDate까지 일수를 반환
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

// startDate 부터 lastDate 까지 날짜 객체를 배열로 반환
export const getDateStartToLast = (startDate: Date, lastDate: Date) => {
  const result = [];
  const current = new Date(startDate); // 인자를 수정하지 않도록 복사본 생성
  while (current <= lastDate) {
    result.push(startDate.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return result;
};
