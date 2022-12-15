import React, {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getEvents, saveEvents } from '../utils/localStorage';

export interface IEvent {
  id: string;
  title: string;
  label: string;
  startDate: Date;
  endDate: Date;
  term: number;
}

interface ContextState {
  events: IEvent[];
}

export const EventsContextState = createContext<ContextState>({
  events: [],
});

interface ContextDispatch {
  setEvents: Dispatch<React.SetStateAction<IEvent[]>> | null;
  addEvent: (event: IEvent) => void;
  removeEvent: (eventId: string) => void;
}
export const EventsContextDispatch = createContext<ContextDispatch>({
  setEvents: null,
  addEvent: (event: IEvent) => {},
  removeEvent: (eventId: string) => {},
});

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    setEvents(
      getEvents().map((e) => {
        e.startDate = new Date(e.startDate);
        e.endDate = new Date(e.endDate);
        return e;
      })
    );
  }, []);

  const addEvent = useCallback(
    (event: IEvent) => {
      const newEvents = [...events, event];
      setEvents(newEvents);
      saveEvents(newEvents);
    },
    [events]
  );

  const removeEvent = useCallback(
    (eventId: string) => {
      const filteredEvents = events.filter((e) => e.id !== eventId);
      setEvents(filteredEvents);
      saveEvents(filteredEvents);
    },
    [events]
  );

  const eventsContextStateValue = useMemo(() => {
    return { events };
  }, [events]);

  const eventsContextDispatchValue = useMemo(() => {
    return { setEvents, addEvent, removeEvent };
  }, [addEvent, removeEvent]);
  return (
    <EventsContextState.Provider value={eventsContextStateValue}>
      <EventsContextDispatch.Provider value={eventsContextDispatchValue}>
        {children}
      </EventsContextDispatch.Provider>
    </EventsContextState.Provider>
  );
};
