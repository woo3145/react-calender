import { useState } from 'react';
import AddScheduleModal from '../Modals/AddScheduleModal';

const AddEventButton = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div
        onClick={openModal}
        className="flex justify-center items-center py-2 bg-purple-600 text-white rounded-md
cursor-pointer hover:bg-purple-700 duration-200"
      >
        일정 추가
      </div>
      {modalIsOpen && (
        <AddScheduleModal isOpen={modalIsOpen} closeModal={closeModal} />
      )}
    </>
  );
};

export default AddEventButton;
