import { useContext } from 'react';
import { DateContextState } from '../../Context/dateContext';
import TableHead from './TableHead';
import TableItem from './TableItem';

const Table = () => {
  const {
    referenceDate,
    lastDateOfLastMonth,
    firstDateOfReferenceDate,
    lastDateOfReferenceDate,
  } = useContext(DateContextState);

  const firstDateOfReferenceDate_day = firstDateOfReferenceDate.getDay();
  const lastDateOfReferenceMonth_date = lastDateOfReferenceDate.getDate();
  const lastDateOfLastMonth_date = lastDateOfLastMonth.getDate();

  // (현재달의 요일 시작일 + 현재달의 마지막 일) / 7  === week 수
  const lineCount = Math.ceil(
    (firstDateOfReferenceDate_day + lastDateOfLastMonth_date) / 7
  );
  const lineCountIter = Array.from({ length: lineCount }, (v, i) => i);
  const weekIter = Array.from({ length: 7 }, (v, i) => i + 1);

  return (
    <table className="w-full border border-collapse table-fixed">
      <TableHead />
      <tbody>
        {lineCountIter.map((week) => {
          return (
            <tr key={week}>
              <>
                {weekIter.map((d, idx) => {
                  const date = week * 7 + d - firstDateOfReferenceDate_day;

                  return (
                    <TableItem
                      key={date}
                      lastDateOfReferenceMonth={lastDateOfReferenceMonth_date}
                      referenceDate={referenceDate}
                      date={date}
                      containerIdx={week * 7 + idx}
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
