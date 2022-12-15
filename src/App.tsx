import React from 'react';
import ReactModal from 'react-modal';
import MonthController from './Components/MonthController/MonthController';
import SideBar from './Components/SideBar/SideBar';
import Table from './Components/Table/Table';

ReactModal.setAppElement('#root');

function App() {
  return (
    <div className="w-full h-screen bg-neutral-200">
      <div className="py-20">
        <div className="w-full max-w-7xl mx-auto flex bg-white rounded-md">
          <SideBar />
          <div className="w-full">
            <MonthController />
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
