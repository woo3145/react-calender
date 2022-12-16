import { useEffect, useState } from 'react';
import { ReferenceDate } from '../../Context/dateContext';
import { ISchedule } from '../../Context/scheduleContext';
import { useSchedule } from '../../hooks/useSchedule';
import ScheduleLabelList from './ScheduleLabelList';

interface Props {
  referenceDate: ReferenceDate;
  date: number;
  lastDateOfReferenceMonth: number;
}

const TableItem = ({
  referenceDate,
  date,
  lastDateOfReferenceMonth,
}: Props) => {
  const valid = 0 < date && date <= lastDateOfReferenceMonth;

  const { year, month } = referenceDate;
  const containerDate = new Date(year, month, date, 9);
  const containerDate_year = containerDate.getFullYear();
  const containerDate_month = containerDate.getMonth();
  const containerDate_date = containerDate.getDate();

  const { filteredSchedules } = useSchedule();
  const [viewedSchedules, setViewedSchedules] = useState<ISchedule[]>([]);
  // 이벤트 가져오기
  useEffect(() => {
    setViewedSchedules(
      filteredSchedules
        .filter((e) => {
          if (
            containerDate_year < e.startDate.getFullYear() ||
            e.endDate.getFullYear() < containerDate_year
          ) {
            return false;
          }
          if (
            containerDate_month < e.startDate.getMonth() ||
            e.endDate.getMonth() < containerDate_month
          ) {
            return false;
          }
          if (
            containerDate_date < e.startDate.getDate() ||
            e.endDate.getDate() < containerDate_date
          ) {
            return false;
          }

          return true;
        })
        .sort((a, b) => {
          return b.term - a.term;
        })
    );
  }, [
    filteredSchedules,
    containerDate_year,
    containerDate_month,
    containerDate_date,
  ]);

  return (
    <td className="border py-2">
      <div className="h-24 relative">
        <div
          className={`pr-4 text-right text-lg font-light cursor-pointer hover:underline
        ${valid ? 'text-neutral-600' : 'opacity-30'}`}
        >
          {containerDate.getDate()}
        </div>
        <ScheduleLabelList
          viewedSchedules={viewedSchedules}
          containerDate={containerDate}
        />
      </div>
    </td>
  );
};

export default TableItem;
