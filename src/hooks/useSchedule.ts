import { useContext, useEffect, useState } from 'react';
import { DateContextState } from '../Context/dateContext';
import { ISchedule, ScheduleContextState } from '../Context/scheduleContext';

export const useSchedule = () => {
  const { referenceDate } = useContext(DateContextState);
  const { schedules } = useContext(ScheduleContextState);

  const [filteredSchedules, setFilteredSchedules] =
    useState<ISchedule[]>(schedules);

  // 현재 참조중인 달과 전달, 다음달의 이벤트만 걸러냄
  useEffect(() => {
    setFilteredSchedules(
      schedules.filter((schedule) => {
        if (referenceDate.month === 11) {
          if (
            schedule.startDate.getFullYear() - referenceDate.year !== 0 &&
            schedule.startDate.getFullYear() - referenceDate.year !== 1
          ) {
            return false;
          }
          return (
            schedule.startDate.getMonth() === 10 ||
            schedule.startDate.getMonth() === 11 ||
            schedule.startDate.getMonth() === 0
          );
        } else if (referenceDate.month === 0) {
          if (
            schedule.startDate.getFullYear() - referenceDate.year !== 0 &&
            schedule.startDate.getFullYear() - referenceDate.year !== -1
          ) {
            return false;
          }
          return (
            schedule.startDate.getMonth() === 11 ||
            schedule.startDate.getMonth() === 0 ||
            schedule.startDate.getMonth() === 1
          );
        } else {
          if (schedule.startDate.getFullYear() - referenceDate.year !== 0) {
            return false;
          }
          return (
            Math.abs(referenceDate.month - schedule.startDate.getMonth()) <= 1
          );
        }
      })
    );
  }, [schedules, referenceDate.year, referenceDate.month]);

  return { filteredSchedules };
};
