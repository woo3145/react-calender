import { useState } from 'react';
import { ISchedule } from '../../Context/scheduleContext';
import UpdateScheduleModal from '../Modals/UpdateScheduleModal';

interface Props {
  isEmptyPlace: boolean;
  width: number;
  schedule: ISchedule;
}

const ScheduleLabel = ({ isEmptyPlace, width, schedule }: Props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  if (isEmptyPlace) {
    return <div className={`w-full h-6`}></div>;
  }
  return (
    <>
      <div
        onClick={openModal}
        style={{
          width: width,
        }}
        className={`w-full border bg-red-200 rounded-md text-xs px-2 h-6 flex items-center cursor-pointer`}
      >
        {schedule.title}
      </div>

      {modalIsOpen && (
        <UpdateScheduleModal
          schedule={schedule}
          isOpen={modalIsOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default ScheduleLabel;
