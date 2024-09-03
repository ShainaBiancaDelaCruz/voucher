//frontend/src/components/table/TableRow.jsx

import PropTypes from 'prop-types';

export const TableRow = ({ tableRowData, onEditClick, onDeleteClick, onDownloadPDF }) => {
  const { _id, createdAt, updatedAt, __v, ...filteredData } = tableRowData;
  const tableRowValues = Object.values(filteredData);

  return (
    <tr className="flex flex-col md:flex-row justify-between text-start text-sm">
      {tableRowValues.map((data, index) => (
        <td key={index} className="w-40 p-2 border-r border-b border-gray-300 text-left break-words">
          {data}
        </td>
      ))}
      <td>
        <button onClick={onEditClick} className="text-blue-500 hover:underline mr-2">
          Edit
        </button>
        <button onClick={onDeleteClick} className="text-red-500 hover:underline mr-2">
          Delete
        </button>
        <button onClick={onDownloadPDF} className="text-green-500 hover:underline">
          Download PDF
        </button>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  tableRowData: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onDownloadPDF: PropTypes.func.isRequired,  // Add prop type for onDownloadPDF
};
