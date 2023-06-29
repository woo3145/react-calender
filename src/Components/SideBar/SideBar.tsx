import AddEventButton from './AddEventButton';
import Filter from './Filter/Filter';

const SideBar = () => {
  return (
    <div className="">
      <div className="h-auto p-4">
        <AddEventButton />
        <Filter />
      </div>
    </div>
  );
};

export default SideBar;
