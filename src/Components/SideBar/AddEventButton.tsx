import { useContext } from 'react';
import { EventsContextDispatch } from '../../Context/eventsContext';
import { v4 as uuidv4 } from 'uuid';

const AddEventButton = () => {
  const { addEvent } = useContext(EventsContextDispatch);
  return (
    <div
      onClick={() => {
        addEvent({
          id: uuidv4(),
          title: '테스트',
          startDate: new Date(2022, 11, 1),
          endDate: new Date(2022, 11, 2),
          term: 1,
          label: '일정',
        });
      }}
      className="flex justify-center items-center py-2 bg-purple-600 text-white rounded-md
cursor-pointer hover:bg-purple-700 duration-200"
    >
      일정 추가
    </div>
  );
};

export default AddEventButton;
