import { IEvent } from '../Context/eventsContext';

export const getEvents = () => {
  const events = localStorage.getItem('events');
  if (!events) return [];
  return JSON.parse(events) as IEvent[];
};

export const saveEvents = (events: IEvent[]) => {
  localStorage.setItem('events', JSON.stringify(events));
};
