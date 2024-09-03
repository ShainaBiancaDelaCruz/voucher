import PropTypes from "prop-types";

export const TableHead = ({
	tableData
}) => {

  return (
    <tr className={` flex flex-col md:flex-row justify-between `}>
      {tableData?.map((head) => (
        <th key={head.name} className="w-40 p-2 border-r border-b border-gray-300 text-left break-words">
          {head.name}
        </th>
      ))}
    </tr>
  );
};

TableHead.propTypes = {
  tableData: PropTypes.array,
};
