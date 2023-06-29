import { useContext } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { Month } from '../../Constant/constant';
import {
  DateContextDispatch,
  DateContextState,
} from '../../Context/dateContext';
import { ScheduleContextDispatch } from '../../Context/scheduleContext';

const MonthController = () => {
  const { referenceDate } = useContext(DateContextState);
  const { setReferenceDate } = useContext(DateContextDispatch);
  const { init } = useContext(ScheduleContextDispatch);

  const { year, month } = referenceDate;

  const prevMonth = () => {
    if (!setReferenceDate) return;
    setReferenceDate({
      year: month - 1 < 0 ? year - 1 : year,
      month: month - 1 < 0 ? 11 : month - 1,
    });
  };
  const nextMonth = () => {
    if (!setReferenceDate) return;

    setReferenceDate({
      year: 11 < month + 1 ? year + 1 : year,
      month: 11 < month + 1 ? 0 : month + 1,
    });
  };

  return (
    <div className="flex items-center justify-between px-4 pt-6 pb-4 border-l">
      <div className="flex items-center text-xl text-neutral-600">
        <IoChevronBackOutline
          onClick={prevMonth}
          className="w-6 h-6 mr-2 cursor-pointer"
        />
        <IoChevronForwardOutline
          onClick={nextMonth}
          className="w-6 h-6 mr-2 cursor-pointer"
        />
        <h2 className="ml-4">
          {Month[month]} {year}
        </h2>
      </div>
      <button className="text-red-500" onClick={init}>
        초기화
      </button>
    </div>
  );
};

export default MonthController;
