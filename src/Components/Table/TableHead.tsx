import { Week } from '../../Constant/constant';

const TableHead = () => {
  return (
    <thead className="text-neutral-700">
      <tr className="">
        {Week.map((week, idx) => {
          return (
            <th key={idx} className="font-semibold py-2 border">
              {week}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
