import TableHead from './TableHead';
import TableItem from './TableItem';

const Table = () => {
  return (
    <table className="w-full table-fixed border-collapse border">
      <TableHead />
      <tbody>
        <tr>
          <TableItem text="1" />
          <TableItem text="2" />
          <TableItem text="3" />
          <TableItem text="4" />
          <TableItem text="5" />
          <TableItem text="6" />
          <TableItem text="7" />
        </tr>
        <tr>
          <TableItem text="8" />
          <TableItem text="9" />
          <TableItem text="10" />
          <TableItem text="11" />
          <TableItem text="12" />
          <TableItem text="13" />
          <TableItem text="14" />
        </tr>
        <tr>
          <TableItem text="15" />
          <TableItem text="16" />
          <TableItem text="17" />
          <TableItem text="18" />
          <TableItem text="19" />
          <TableItem text="20" />
          <TableItem text="21" />
        </tr>
        <tr>
          <TableItem text="22" />
          <TableItem text="23" />
          <TableItem text="24" />
          <TableItem text="25" />
          <TableItem text="26" />
          <TableItem text="27" />
          <TableItem text="28" />
        </tr>
        <tr>
          <TableItem text="29" />
          <TableItem text="30" />
          <TableItem text="31" />
          <TableItem text="1" />
          <TableItem text="2" />
          <TableItem text="3" />
          <TableItem text="4" />
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
