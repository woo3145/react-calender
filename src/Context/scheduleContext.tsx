import React, {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  getSchedules,
  initialSchedules,
  saveSchedules,
} from '../utils/localStorage';

export interface ISchedule {
  id: string;
  title: string;
  label: string;
  startDate: Date;
  endDate: Date;
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
  updateSchedule: (schedule: ISchedule) => void;
  removeSchedule: (scheduleId: string) => void;
  init: () => void;
}
export const ScheduleContextDispatch = createContext<ContextDispatch>({
  setSchedules: null,
  addSchedule: (schedule: ISchedule) => {},
  updateSchedule: (schedule: ISchedule) => {},
  removeSchedule: (scheduleId: string) => {},
  init: () => {},
});

export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
  const [schedules, setSchedules] = useState<ISchedule[]>([]);

  // 오늘 날짜 기준 디폴트값으로 스케줄 초기화
  const init = () => {
    setSchedules(initialSchedules());
  };

  // 로컬 스토리지에서 스케줄 불러오기
  useEffect(() => {
    try {
      const localStorageItems = getSchedules()
        .map((e) => {
          e.startDate = new Date(e.startDate);
          e.endDate = new Date(e.endDate);
          return e;
        })
        .sort((a, b) => a.startDate.getDate() - b.startDate.getDate());
      setSchedules(localStorageItems);
    } catch (e) {
      init();
    }
  }, []);

  // 스케줄 추가
  const addSchedule = useCallback(
    (schedule: ISchedule) => {
      const newSchedules = [...schedules, schedule];
      setSchedules(newSchedules);
      saveSchedules(newSchedules);
    },
    [schedules]
  );

  // 스케줄 제거
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

  // 스케줄 업데이트
  const updateSchedule = useCallback(
    (schedule: ISchedule) => {
      const updatedSchedule = schedules.map((prev) => {
        if (prev.id === schedule.id) {
          return schedule;
        }
        return prev;
      });
      setSchedules(updatedSchedule);
      saveSchedules(updatedSchedule);
    },
    [schedules]
  );

  const scheduleContextStateValue = useMemo(() => {
    return { schedules };
  }, [schedules]);

  const scheduleContextDispatchValue = useMemo(() => {
    return { setSchedules, addSchedule, updateSchedule, removeSchedule, init };
  }, [addSchedule, updateSchedule, removeSchedule]);

  return (
    <ScheduleContextState.Provider value={scheduleContextStateValue}>
      <ScheduleContextDispatch.Provider value={scheduleContextDispatchValue}>
        {children}
      </ScheduleContextDispatch.Provider>
    </ScheduleContextState.Provider>
  );
};
