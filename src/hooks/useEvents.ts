import { useContext, useEffect, useState } from 'react';
import { DateContextState } from '../Context/dateContext';
import { EventsContextState, IEvent } from '../Context/eventsContext';

export const useEvents = () => {
  const { referenceDate } = useContext(DateContextState);
  const { events } = useContext(EventsContextState);

  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>(events);

  // 현재 참조중인 달과 전달, 다음달의 이벤트만 걸러냄
  useEffect(() => {
    setFilteredEvents(
      events.filter((event) => {
        if (referenceDate.month === 11) {
          if (
            event.startDate.getFullYear() - referenceDate.year !== 0 &&
            event.startDate.getFullYear() - referenceDate.year !== 1
          ) {
            return false;
          }
          return (
            event.startDate.getMonth() === 10 ||
            event.startDate.getMonth() === 11 ||
            event.startDate.getMonth() === 0
          );
        } else if (referenceDate.month === 0) {
          if (
            event.startDate.getFullYear() - referenceDate.year !== 0 &&
            event.startDate.getFullYear() - referenceDate.year !== -1
          ) {
            return false;
          }
          return (
            event.startDate.getMonth() === 11 ||
            event.startDate.getMonth() === 0 ||
            event.startDate.getMonth() === 1
          );
        } else {
          if (event.startDate.getFullYear() - referenceDate.year !== 0) {
            return false;
          }
          return (
            Math.abs(referenceDate.month - event.startDate.getMonth()) <= 1
          );
        }
      })
    );
  }, [events, referenceDate.year, referenceDate.month]);

  return { filteredEvents };
};
