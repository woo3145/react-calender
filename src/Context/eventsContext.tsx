import React, {
  createContext,
  Dispatch,
  ReactNode,
  useMemo,
  useState,
} from 'react';

export interface IEvent {
  title: string;
  label: string;
  startDate: Date;
  endDate: Date;
}

interface ContextState {
  events: IEvent[];
}

export const EventsContextState = createContext<ContextState>({
  events: [],
});

interface ContextDispatch {
  setEvents: Dispatch<React.SetStateAction<IEvent[]>> | null;
}
export const EventsContextDispatch = createContext<ContextDispatch>({
  setEvents: null,
});

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<IEvent[]>([
    {
      title: '일정 테스트',
      label: 'Personal',
      startDate: new Date(2022, 11, 9),
      endDate: new Date(2022, 11, 9),
    },
    {
      title: '일정 테스트22',
      label: 'Personal',
      startDate: new Date(2022, 11, 13),
      endDate: new Date(2022, 11, 13),
    },
    {
      title: '일정 테스트33',
      label: 'Personal',
      startDate: new Date(2022, 10, 30),
      endDate: new Date(2022, 10, 30),
    },
    {
      title: '일정 테스트333',
      label: 'Personal',
      startDate: new Date(2022, 10, 30),
      endDate: new Date(2022, 10, 30),
    },
  ]);

  const eventsContextStateValue = useMemo(() => {
    return { events };
  }, [events]);

  const eventsContextDispatchValue = useMemo(() => {
    return { setEvents };
  }, []);
  return (
    <EventsContextState.Provider value={eventsContextStateValue}>
      <EventsContextDispatch.Provider value={eventsContextDispatchValue}>
        {children}
      </EventsContextDispatch.Provider>
    </EventsContextState.Provider>
  );
};
