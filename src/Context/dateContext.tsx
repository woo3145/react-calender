import { createContext, Dispatch, ReactNode, useMemo, useState } from 'react';

interface ReferenceDate {
  month: number;
  year: number;
}

interface ContextState {
  currentDate: Date;
  firstDateOfReferenceDate: Date;
  lastDateOfReferenceDate: Date;
  lastDateOfLastMonth: Date;
  referenceDate: {
    year: number;
    month: number;
  };
}

export const DateContextState = createContext<ContextState>({
  currentDate: new Date(),
  firstDateOfReferenceDate: new Date(),
  lastDateOfReferenceDate: new Date(),
  lastDateOfLastMonth: new Date(),
  referenceDate: {
    year: -1,
    month: -1,
  },
});

interface ContextDispatch {
  setReferenceDate: Dispatch<React.SetStateAction<ReferenceDate>> | null;
}
export const DateContextDispatch = createContext<ContextDispatch>({
  setReferenceDate: null,
});

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const currentDate = useMemo(() => new Date(), []);
  const [referenceDate, setReferenceDate] = useState<ReferenceDate>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
  });

  // 참조중인 지난달의 마지막날
  const lastDateOfLastMonth = useMemo(() => {
    return new Date(referenceDate.year, referenceDate.month, 0);
  }, [referenceDate.year, referenceDate.month]);
  // 참조중인달의 첫날
  const firstDateOfReferenceDate = useMemo(() => {
    return new Date(referenceDate.year, referenceDate.month, 1);
  }, [referenceDate.year, referenceDate.month]);
  // 참조중인달의 마지막날
  const lastDateOfReferenceDate = useMemo(() => {
    return new Date(referenceDate.year, referenceDate.month + 1, 0);
  }, [referenceDate.year, referenceDate.month]);

  const dateContextStateValue = useMemo(() => {
    return {
      currentDate,
      referenceDate,
      firstDateOfReferenceDate,
      lastDateOfReferenceDate,
      lastDateOfLastMonth,
    };
  }, [
    currentDate,
    referenceDate,
    firstDateOfReferenceDate,
    lastDateOfReferenceDate,
    lastDateOfLastMonth,
  ]);

  const dateContextDispatchValue = useMemo(() => {
    return {
      setReferenceDate,
    };
  }, []);
  return (
    <DateContextState.Provider value={dateContextStateValue}>
      <DateContextDispatch.Provider value={dateContextDispatchValue}>
        {children}
      </DateContextDispatch.Provider>
    </DateContextState.Provider>
  );
};
