const TableItem = ({ text }: { text: string }) => {
  return (
    <td className="border pr-4 py-2">
      <div className="h-24">
        <div className="text-right text-lg font-light text-neutral-600 cursor-pointer hover:underline">
          {text}
        </div>
      </div>
    </td>
  );
};

export default TableItem;
