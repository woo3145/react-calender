interface Props {
  date: number;
  lastDateOfLastMonth: number;
  lastDateOfCurrentMonth: number;
}

const TableItem = ({
  date,
  lastDateOfLastMonth,
  lastDateOfCurrentMonth,
}: Props) => {
  const valid = 0 < date && date <= lastDateOfCurrentMonth;
  const lastMonth = date <= 0;
  const nextMonth = lastDateOfCurrentMonth < date;
  return (
    <td className="border pr-4 py-2">
      <div className="h-24">
        <p
          className={`text-right text-lg font-light cursor-pointer hover:underline
        ${valid ? 'text-neutral-600' : 'opacity-30'}`}
        >
          {valid && date}
          {lastMonth && date + lastDateOfLastMonth}
          {nextMonth && date - lastDateOfCurrentMonth}
        </p>
      </div>
    </td>
  );
};

export default TableItem;
