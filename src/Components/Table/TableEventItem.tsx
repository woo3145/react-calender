import { IEvent } from '../../Context/eventsContext';

interface Props {
  viewedEvents: IEvent[];
}

const TableEventItem = ({ viewedEvents }: Props) => {
  return (
    <div className="absolute left-0 right-0">
      {viewedEvents.map((event, idx) => {
        return (
          <div
            key={idx}
            className="w-full border bg-red-200 rounded-md text-xs px-2 py-0.5 cursor-pointer"
          >
            {event.title}
          </div>
        );
      })}
    </div>
  );
};
export default TableEventItem;
