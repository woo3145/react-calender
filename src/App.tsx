import React from 'react';
import SideBar from './Components/SideBar/SideBar';

function App() {
  return (
    <div className="w-full h-screen bg-neutral-200">
      <div className="py-20">
        <div className="w-full max-w-7xl mx-auto flex bg-white rounded-md">
          <SideBar />
          <div className="w-full">main</div>
        </div>
      </div>
    </div>
  );
}

export default App;
