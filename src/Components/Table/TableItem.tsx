import { useContext, useMemo } from 'react';
import { DateContextState, ReferenceDate } from '../../Context/dateContext';
import { isSameDay } from '../../utils/dateUtils';
import ScheduleLabelList from './ScheduleLabelList';

interface Props {
  referenceDate: ReferenceDate;
  date: number;
  lastDateOfReferenceMonth: number;
  containerIdx: number;
}

const TableItem = ({
  referenceDate,
  date,
  lastDateOfReferenceMonth,
  containerIdx,
}: Props) => {
  const { currentDate } = useContext(DateContextState);
  const valid = 0 < date && date <= lastDateOfReferenceMonth;
  const { year, month } = referenceDate;
  const containerDate = useMemo(() => {
    return new Date(year, month, date);
  }, [date, month, year]);

  const isCurrentDate = isSameDay(currentDate, containerDate);

  return (
    <td className="pt-2 pb-4 border">
      <div className="relative h-24">
        <div
          className={`pr-2 lg:pr-4 text-right text-sm lg:text-lg font-light cursor-pointer hover:underline
        ${valid ? 'text-neutral-600' : 'opacity-30'}`}
        >
          <span
            className={`${
              isCurrentDate ? 'text-purple-700 font-semibold' : ''
            }`}
          >
            {containerDate.getDate()}
          </span>
        </div>
        <ScheduleLabelList
          containerDate={containerDate}
          containerIdx={containerIdx}
        />
      </div>
    </td>
  );
};

export default TableItem;
