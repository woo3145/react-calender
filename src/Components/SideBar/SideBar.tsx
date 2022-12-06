import AddEventButton from './AddEventButton';
import Filter from './Filter/Filter';

const SideBar = () => {
  return (
    <div className="shrink-0">
      <div className="w-64 h-auto p-4">
        <AddEventButton />
        <Filter />
      </div>
    </div>
  );
};

export default SideBar;
