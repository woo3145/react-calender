import { v4 } from 'uuid';
import { ILabel } from '../Context/labelContext';
import { ISchedule } from '../Context/scheduleContext';

export const getDefaultSchedules = (): ISchedule[] => {
  const today = new Date();
  return [
    {
      id: v4(),
      title: '당일 일정1',
      label: '개인',
      startDate: new Date(today.getFullYear(), today.getMonth(), 17),
      endDate: new Date(today.getFullYear(), today.getMonth(), 17),
    },
    {
      id: v4(),
      title: '당일 일정2',
      label: '개인',
      startDate: new Date(today.getFullYear(), today.getMonth(), 4),
      endDate: new Date(today.getFullYear(), today.getMonth(), 4),
    },
    {
      id: v4(),
      title: '당일 일정3',
      label: '휴일',
      startDate: new Date(today.getFullYear(), today.getMonth(), 4),
      endDate: new Date(today.getFullYear(), today.getMonth(), 4),
    },
    {
      id: v4(),
      title: '당일 일정4',
      label: '휴일',
      startDate: new Date(today.getFullYear(), today.getMonth(), 9),
      endDate: new Date(today.getFullYear(), today.getMonth(), 9),
    },
    {
      id: v4(),
      title: '장기 일정1',
      label: '업무',
      startDate: new Date(today.getFullYear(), today.getMonth(), 21),
      endDate: new Date(today.getFullYear(), today.getMonth(), 29),
    },
    {
      id: v4(),
      title: '장기 일정2',
      label: '그외',
      startDate: new Date(today.getFullYear(), today.getMonth(), 1),
      endDate: new Date(today.getFullYear(), today.getMonth(), 4),
    },
  ];
};

export const getDefaultLabels = (): ILabel[] => {
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
