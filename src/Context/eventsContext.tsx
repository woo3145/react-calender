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
}
export const EventsContextDispatch = createContext<ContextDispatch>({
  setEvents: null,
});

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<IEvent[]>([
    {
      title: '일정 테스트 9 13',
      label: 'Personal',
      startDate: new Date(2022, 11, 9),
      endDate: new Date(2022, 11, 13),
      term: 4,
    },
    {
      title: '일정 테스트 13',
      label: 'Personal',
      startDate: new Date(2022, 11, 13),
      endDate: new Date(2022, 11, 13),
      term: 0,
    },
    {
      title: '일정 테스트 11 13',
      label: 'Personal',
      startDate: new Date(2022, 11, 11),
      endDate: new Date(2022, 11, 13),
      term: 2,
    },
    {
      title: '일정 테스트 0',
      label: 'Personal',
      startDate: new Date(2022, 11, 11),
      endDate: new Date(2022, 11, 11),
      term: 0,
    },
    {
      title: '일정 테스트 31',
      label: 'Personal',
      startDate: new Date(2022, 0, 0),
      endDate: new Date(2022, 0, 0),
      term: 0,
    },
    {
      title: '일정 테스트33',
      label: 'Personal',
      startDate: new Date(2022, 11, 31),
      endDate: new Date(2022, 11, 31),
      term: 0,
    },
    {
      title: '일정 테스트333',
      label: 'Personal',
      startDate: new Date(2022, 11, 30),
      endDate: new Date(2022, 11, 31),
      term: 1,
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
