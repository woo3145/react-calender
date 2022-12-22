import { useCallback, useContext } from 'react';
import { ScheduleContextState } from '../Context/scheduleContext';
import { isBetweenDay } from '../utils/dateUtils';

export const useSchedule = () => {
  const { schedules } = useContext(ScheduleContextState);

  const getContainerSchedule = useCallback(
    (date: Date) => {
      return schedules.filter((schedule) => {
        return isBetweenDay(date, schedule.startDate, schedule.endDate);
      });
    },
    [schedules]
  );

  return { getContainerSchedule };
};
