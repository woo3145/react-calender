import { useEffect, useState } from 'react';
import { ReferenceDate } from '../../Context/dateContext';
import { IEvent } from '../../Context/eventsContext';
import { useEvents } from '../../hooks/useEvents';
import TableEventItem from './TableEventItem';

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
  const containerDate = new Date(year, month, date);
  const containerDate_year = containerDate.getFullYear();
  const containerDate_month = containerDate.getMonth();
  const containerDate_date = containerDate.getDate();

  const { filteredEvents } = useEvents();
  const [viewedEvents, setViewedEvents] = useState<IEvent[]>([]);

  // 이벤트 가져오기
  useEffect(() => {
    setViewedEvents(
      filteredEvents.filter((e) => {
        if (e.startDate.getFullYear() !== containerDate_year) {
          return false;
        }
        if (e.startDate.getMonth() !== containerDate_month) {
          return false;
        }
        if (e.startDate.getDate() !== containerDate_date) {
          return false;
        }

        return true;
      })
    );
  }, [
    filteredEvents,
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
        <TableEventItem viewedEvents={viewedEvents} />
      </div>
    </td>
  );
};

export default TableItem;
