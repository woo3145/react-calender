import { ILabel } from '../Context/labelContext';
import { ISchedule } from '../Context/scheduleContext';

export const getSchedules = () => {
  const schedules = localStorage.getItem('schedules');
  if (!schedules) return [];
  return JSON.parse(schedules) as ISchedule[];
};

export const saveSchedules = (schedules: ISchedule[]) => {
  localStorage.setItem('schedules', JSON.stringify(schedules));
};

export const getLabels = () => {
  const labels = localStorage.getItem('labels');
  if (!labels) return [];
  return JSON.parse(labels) as ILabel[];
};

export const saveLabels = (labels: ILabel[]) => {
  localStorage.setItem('labels', JSON.stringify(labels));
};
