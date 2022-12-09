import { useEffect, useState } from 'react';
import { ReferenceDate } from '../../Context/dateContext';
import { IEvent } from '../../Context/eventsContext';
import { useEvents } from '../../hooks/useEvents';
import TableEventItem from './TableEventItem';

interface Props {
  referenceDate: ReferenceDate;
  date: number;
  lastDateOfLastMonth: number;
  lastDateOfReferenceMonth: number;
}

const TableItem = ({
  referenceDate,
  date,
  lastDateOfLastMonth,
  lastDateOfReferenceMonth,
}: Props) => {
  const valid = 0 < date && date <= lastDateOfReferenceMonth;
  const lastMonth = date <= 0;
  const nextMonth = lastDateOfReferenceMonth < date;

  const { year: rYear, month: rMonth } = referenceDate;
  const realYear = nextMonth && rMonth === 11 ? rYear + 1 : rYear; // 다음달이 내년일 경우 처리
  const realDate =
    (lastMonth && date + lastDateOfLastMonth) ||
    (nextMonth && date - lastDateOfReferenceMonth) ||
    date;

  const { filteredEvents } = useEvents();
  const [viewedEvents, setViewedEvents] = useState<IEvent[]>([]);

  // 이벤트 가져오기
  useEffect(() => {
    setViewedEvents(
      filteredEvents.filter((e) => {
        if (e.startDate.getFullYear() !== realYear) {
          return false;
        }
        if (lastMonth && e.startDate.getMonth() !== referenceDate.month - 1) {
          return false;
        }
        if (
          nextMonth &&
          e.startDate.getMonth() !== (referenceDate.month + 1) % 12
        ) {
          return false;
        }
        if (
          !lastMonth &&
          !nextMonth &&
          e.startDate.getMonth() !== referenceDate.month
        ) {
          return false;
        }

        if (e.startDate.getDate() !== realDate) {
          return false;
        }

        return true;
      })
    );
  }, [
    filteredEvents,
    lastMonth,
    nextMonth,
    referenceDate.year,
    referenceDate.month,
    realYear,
    realDate,
  ]);

  return (
    <td className="border py-2">
      <div className="h-24 relative">
        <div
          className={`pr-4 text-right text-lg font-light cursor-pointer hover:underline
        ${valid ? 'text-neutral-600' : 'opacity-30'}`}
        >
          {valid && date}
          {lastMonth && date + lastDateOfLastMonth}
          {nextMonth && date - lastDateOfReferenceMonth}
        </div>
        <TableEventItem viewedEvents={viewedEvents} />
      </div>
    </td>
  );
};

export default TableItem;
