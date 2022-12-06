import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

const MonthController = () => {
  return (
    <div className="flex text-xl items-center pt-6 pb-4 px-4 text-neutral-600 border-l">
      <IoChevronBackOutline className="mr-2 w-6 h-6 cursor-pointer" />
      <IoChevronForwardOutline className="mr-2 w-6 h-6 cursor-pointer" />
      <h2 className="ml-4">December 2022</h2>
    </div>
  );
};

export default MonthController;
