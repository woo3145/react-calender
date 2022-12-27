import { ILabel } from '../Context/labelContext';
import { ISchedule } from '../Context/scheduleContext';
import { getDefaultLabels, getDefaultSchedules } from './mockData';

export const initialSchedules = (): ISchedule[] => {
  const defaultSchedules = getDefaultSchedules();
  saveSchedules(defaultSchedules);
  return defaultSchedules;
};

export const getSchedules = () => {
  const schedules = localStorage.getItem('schedules');
  if (!schedules) return initialSchedules();
  return JSON.parse(schedules) as ISchedule[];
};

export const saveSchedules = (schedules: ISchedule[]) => {
  localStorage.setItem('schedules', JSON.stringify(schedules));
};

export const initialLabels = (): ILabel[] => {
  const defaultLabels = getDefaultLabels();
  saveLabels(defaultLabels);
  return defaultLabels;
};

export const getLabels = () => {
  const labels = localStorage.getItem('labels');
  if (!labels) return initialLabels();
  return JSON.parse(labels) as ILabel[];
};

export const saveLabels = (labels: ILabel[]) => {
  localStorage.setItem('labels', JSON.stringify(labels));
};
