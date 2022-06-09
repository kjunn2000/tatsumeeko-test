import React from "react";
import { useTable, useSortBy } from "react-table";

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable(
      {
        columns,
        data,
        manualPaginations: true,
      },
      useSortBy
    );

  return (
    <>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table
                {...getTableProps()}
                className="w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-800 text-white">
                  {headerGroups.map((headerGroup, i) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                      {headerGroup.headers.map((column, i) => (
                        <th
                          scope="col"
                          className="group px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                          key={i}
                        >
                          <div className="flex items-center justify-between">
                            {column.render("Header")}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-gray-700 divide-y divide-gray-200"
                >
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} key={i}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-4 whitespace-nowrap"
                              role="cell"
                            >
                              {cell.column.Cell.name === "defaultRenderer" ? (
                                <div className="text-sm text-white">
                                  {cell.render("Cell")}
                                </div>
                              ) : (
                                cell.render("Cell")
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
