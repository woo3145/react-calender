import { useContext, useState } from 'react';
import { LabelContextState } from '../../Context/labelContext';
import { ISchedule } from '../../Context/scheduleContext';
import UpdateScheduleModal from '../Modals/UpdateScheduleModal';

interface Props {
  isEmptyPlace: boolean;
  width: number;
  schedule: ISchedule;
}

const ScheduleLabel = ({ isEmptyPlace, width, schedule }: Props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { labels } = useContext(LabelContextState);

  const label = labels.filter((label) => label.name === schedule.label)[0];

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  if (isEmptyPlace) {
    return (
      <>
        <div onClick={openModal} className={`w-full h-6 cursor-pointer`}></div>
        {modalIsOpen && (
          <UpdateScheduleModal
            schedule={schedule}
            isOpen={modalIsOpen}
            closeModal={closeModal}
          />
        )}
      </>
    );
  }
  return (
    <>
      <div
        onClick={openModal}
        style={{
          width: width,
        }}
        className={`w-full border relative rounded-md  text-xs px-2 h-6 flex items-center cursor-pointer`}
      >
        <div
          style={{
            backgroundColor: label ? label.color : '#8492a6',
            opacity: 0.2,
          }}
          className="absolute top-0 left-0 w-full h-full"
        ></div>
        <p
          style={{
            opacity: 1,
            color: label ? label.color : '#8492a6',
          }}
        >
          {schedule.title}
        </p>
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
