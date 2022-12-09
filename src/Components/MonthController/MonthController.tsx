import { useContext } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { Month } from '../../Constant/constant';
import {
  DateContextDispatch,
  DateContextState,
} from '../../Context/dateContext';

const MonthController = () => {
  const { referenceDate } = useContext(DateContextState);
  const { setReferenceDate } = useContext(DateContextDispatch);

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
    <div className="flex text-xl items-center pt-6 pb-4 px-4 text-neutral-600 border-l">
      <IoChevronBackOutline
        onClick={prevMonth}
        className="mr-2 w-6 h-6 cursor-pointer"
      />
      <IoChevronForwardOutline
        onClick={nextMonth}
        className="mr-2 w-6 h-6 cursor-pointer"
      />
      <h2 className="ml-4">
        {Month[month]} {year}
      </h2>
    </div>
  );
};

export default MonthController;
