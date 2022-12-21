import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { ISchedule } from '../../Context/scheduleContext';
import ScheduleLabel from './ScheduleLabel';

interface Props {
  schedules: ISchedule[];
  containerDate: Date;
}

const ScheduleMoreLabelList = ({ schedules, containerDate }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  return (
    <>
      <p
        onClick={open}
        className="text-sm cursor-pointer opacity-60 hover:opacity-100 duration-200"
      >
        +{schedules.length - 2} more
      </p>
      {isOpen && (
        <div className="absolute z-30 top-0 left-0 border rounded-md bg-white w-52 py-2 px-2">
          <div className="flex items-center justify-between">
            <p className="opacity-60 text-sm">
              {containerDate.getFullYear()}년 {containerDate.getMonth() + 1}월{' '}
              {containerDate.getDate()}일
            </p>
            <IoClose
              onClick={close}
              className="absolute text-xl right-2 opacity-60 hover:opacity-100 duration-200 cursor-pointer"
            />
          </div>
          <div className="mt-2">
            {schedules.map((schedule, idx) => {
              return <ScheduleLabel key={idx} schedule={schedule} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default ScheduleMoreLabelList;
