import { useContext } from 'react';
import {
  ISchedule,
  ScheduleContextDispatch,
} from '../../Context/scheduleContext';

interface Props {
  isEmptyPlace: boolean;
  width: number;
  schedule: ISchedule;
}

const ScheduleLabel = ({ isEmptyPlace, width, schedule }: Props) => {
  const { removeSchedule } = useContext(ScheduleContextDispatch);

  if (isEmptyPlace) {
    return <div className={`w-full h-6`}></div>;
  }
  return (
    <div
      onClick={() => removeSchedule(schedule.id)} // 임시
      style={{
        width: width,
      }}
      className={`w-full border bg-red-200 rounded-md text-xs px-2 h-6 flex items-center cursor-pointer`}
    >
      {schedule.title}
    </div>
  );
};

export default ScheduleLabel;
