import { useCallback, useContext } from 'react';
import { LabelContextState } from '../Context/labelContext';
import { ScheduleContextState } from '../Context/scheduleContext';
import { isBetweenDay } from '../utils/dateUtils';

export const useSchedule = () => {
  const { schedules } = useContext(ScheduleContextState);
  const { filtering } = useContext(LabelContextState);

  const getContainerSchedule = useCallback(
    (date: Date) => {
      return schedules
        .filter((schedule) => {
          return isBetweenDay(date, schedule.startDate, schedule.endDate);
        })
        .filter((schedule) => {
          return !filtering.includes(schedule.label);
        });
    },
    [schedules, filtering]
  );

  return { getContainerSchedule };
};
