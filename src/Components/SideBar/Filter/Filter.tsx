const Filter = () => {
  return (
    <div className="pt-8">
      <p className="pb-2 opacity-50">Filter</p>
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="w-6 h-6 text-gray-600 border-2 rounded-md focus:ring-0"
        />
        <span className="ml-4 text-lg">View All</span>
      </label>
    </div>
  );
};

export default Filter;
