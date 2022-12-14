import { useMemo } from 'react';
import { ReferenceDate } from '../../Context/dateContext';
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
  const valid = 0 < date && date <= lastDateOfReferenceMonth;

  const { year, month } = referenceDate;
  const containerDate = useMemo(() => {
    return new Date(year, month, date);
  }, [date, month, year]);

  const isCurrentDate = isSameDay(new Date(), containerDate);

  return (
    <td className="border pt-2 pb-4">
      <div className="h-24 relative">
        <div
          className={`pr-4 text-right text-lg font-light cursor-pointer hover:underline
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
