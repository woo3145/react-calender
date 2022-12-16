import { ISchedule } from '../Context/scheduleContext';

export const getSchedules = () => {
  const schedules = localStorage.getItem('schedules');
  if (!schedules) return [];
  return JSON.parse(schedules) as ISchedule[];
};

export const saveSchedules = (schedules: ISchedule[]) => {
  localStorage.setItem('schedules', JSON.stringify(schedules));
};
