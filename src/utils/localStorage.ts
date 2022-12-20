import { ILabel } from '../Context/labelContext';
import { ISchedule } from '../Context/scheduleContext';
import { v4 } from 'uuid';

export const getSchedules = () => {
  const schedules = localStorage.getItem('schedules');
  if (!schedules) return [];
  return JSON.parse(schedules) as ISchedule[];
};

export const saveSchedules = (schedules: ISchedule[]) => {
  localStorage.setItem('schedules', JSON.stringify(schedules));
};

export const initialLabels = (): ILabel[] => {
  return [
    {
      id: v4(),
      name: '개인',
      color: '#ef4444',
      checked: true,
    },
    {
      id: v4(),
      name: '업무',
      color: '#c084fc',
      checked: true,
    },
    {
      id: v4(),
      name: '가족',
      color: '#fbbf24',
      checked: true,
    },
    {
      id: v4(),
      name: '휴일',
      color: '#84cc16',
      checked: true,
    },
    {
      id: v4(),
      name: '그외',
      color: '#22d3ee',
      checked: true,
    },
  ];
};

export const getLabels = () => {
  const labels = localStorage.getItem('labels');
  if (!labels) return initialLabels();
  return JSON.parse(labels) as ILabel[];
};

export const saveLabels = (labels: ILabel[]) => {
  localStorage.setItem('labels', JSON.stringify(labels));
};
