import { useContext } from 'react';
import {
  LabelContextDispatch,
  LabelContextState,
} from '../../../Context/labelContext';

const Filter = () => {
  const { labels, isAllView } = useContext(LabelContextState);
  const { toggleAllView, toggleLabel } = useContext(LabelContextDispatch);
  return (
    <div className="pt-8">
      <p className="pb-2 opacity-50">Filter</p>
      <label className="flex items-center cursor-pointer">
        <input
          checked={isAllView}
          onChange={toggleAllView}
          type="checkbox"
          className="w-6 h-6 text-gray-600 border-2 rounded-md focus:ring-0"
        />
        <span className="ml-4 text-lg text-neutral-600">View All</span>
      </label>
      {labels.map((label, idx) => {
        return (
          <label key={idx} className="flex items-center cursor-pointer mt-2">
            <input
              checked={label.checked}
              onChange={() => toggleLabel(label.name)}
              type="checkbox"
              style={{
                color: label.color,
              }}
              className="w-6 h-6 border-2 rounded-md focus:ring-0"
            />
            <span className="ml-4 text-lg text-neutral-600">{label.name}</span>
          </label>
        );
      })}
    </div>
  );
};

export default Filter;
