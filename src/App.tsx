import React from 'react';
import ReactModal from 'react-modal';
import MonthController from './Components/MonthController/MonthController';
import SideBar from './Components/SideBar/SideBar';
import Table from './Components/Table/Table';
import AddEventButton from './Components/SideBar/AddEventButton';
import Filter from './Components/SideBar/Filter/Filter';

ReactModal.setAppElement('#root');

function App() {
  return (
    <div className="w-full h-screen bg-neutral-200">
      <div className="mx-auto overflow-hidden lg:py-20 max-w-7xl">
        <div className="flex w-full bg-white rounded-md">
          <div className="w-0 duration-300 ease-in-out transform shrink-0 -translate-x-60 lg:translate-x-0 lg:w-64">
            <SideBar />
          </div>
          <div className="w-full">
            <MonthController />
            <Table />
          </div>
        </div>
        {/* 모바일 */}
        <div className="mx-2 mt-4 lg:hidden">
          <AddEventButton />
          <Filter />
        </div>
      </div>
    </div>
  );
}

export default App;
