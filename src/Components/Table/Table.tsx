import TableHead from './TableHead';
import TableItem from './TableItem';

const Table = () => {
  const currentDate = new Date();
  const currentDate_year = currentDate.getFullYear();
  const currentDate_month = currentDate.getMonth() + 1;
  const currentDate_date = currentDate.getDate();

  const lastDateOfLastMonth_date = new Date(
    currentDate_year,
    currentDate_month - 1,
    0
  ).getDate();

  const firstDateOfCurrentMonth = new Date(
    currentDate_year,
    currentDate_month - 1,
    1
  );
  const firstDateOfCurrentMonth_day = firstDateOfCurrentMonth.getDay();

  const lastDateOfCurrentMonth = new Date(
    currentDate_year,
    currentDate_month,
    0
  );
  const lastDateOfCurrentMonth_date = lastDateOfCurrentMonth.getDate();

  // 현재달의 요일 시작일 + 현재달의 마지막 일 / 7  === week 수
  const lineCount = Math.ceil(
    (firstDateOfCurrentMonth_day + lastDateOfCurrentMonth_date) / 7
  );
  const lineCountIter = Array.from({ length: lineCount }, (v, i) => i);
  const weekIter = Array.from({ length: 7 }, (v, i) => i + 1);

  return (
    <table className="w-full table-fixed border-collapse border">
      <TableHead />
      <tbody>
        {lineCountIter.map((week) => {
          return (
            <tr key={week}>
              <>
                {weekIter.map((d, idx) => {
                  const date = week * 7 + d - firstDateOfCurrentMonth_day;
                  return (
                    <TableItem
                      key={week * 7 + idx}
                      lastDateOfLastMonth={lastDateOfLastMonth_date}
                      lastDateOfCurrentMonth={lastDateOfCurrentMonth_date}
                      date={date}
                    />
                  );
                })}
              </>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
