import React, {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getSchedules, saveSchedules } from '../utils/localStorage';

export interface ISchedule {
  id: string;
  title: string;
  label: string;
  startDate: Date;
  endDate: Date;
  term: number;
}

interface ContextState {
  schedules: ISchedule[];
}

export const ScheduleContextState = createContext<ContextState>({
  schedules: [],
});

interface ContextDispatch {
  setSchedules: Dispatch<React.SetStateAction<ISchedule[]>> | null;
  addSchedule: (schedule: ISchedule) => void;
  removeSchedule: (scheduleId: string) => void;
}
export const ScheduleContextDispatch = createContext<ContextDispatch>({
  setSchedules: null,
  addSchedule: (schedule: ISchedule) => {},
  removeSchedule: (scheduleId: string) => {},
});

export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
  const [schedules, setSchedules] = useState<ISchedule[]>([]);

  useEffect(() => {
    setSchedules(
      getSchedules().map((e) => {
        e.startDate = new Date(e.startDate);
        e.endDate = new Date(e.endDate);
        return e;
      })
    );
  }, []);

  const addSchedule = useCallback(
    (schedule: ISchedule) => {
      const newSchedules = [...schedules, schedule];
      setSchedules(newSchedules);
      saveSchedules(newSchedules);
    },
    [schedules]
  );

  const removeSchedule = useCallback(
    (scheduleId: string) => {
      const filteredEvents = schedules.filter(
        (schedule) => schedule.id !== scheduleId
      );
      setSchedules(filteredEvents);
      saveSchedules(filteredEvents);
    },
    [schedules]
  );

  const scheduleContextStateValue = useMemo(() => {
    return { schedules };
  }, [schedules]);

  const scheduleContextDispatchValue = useMemo(() => {
    return { setSchedules, addSchedule, removeSchedule };
  }, [addSchedule, removeSchedule]);

  return (
    <ScheduleContextState.Provider value={scheduleContextStateValue}>
      <ScheduleContextDispatch.Provider value={scheduleContextDispatchValue}>
        {children}
      </ScheduleContextDispatch.Provider>
    </ScheduleContextState.Provider>
  );
};
