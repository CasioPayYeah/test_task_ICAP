'use client'
import React, { useEffect, useState, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { deleteTableData, fetchTableData, saveTableData } from '../api/api';
import { dataType } from '@/app/utils/types';

const tableStyles = "border border-sky-950 px-4 py-2 w-21 min-w-21";

const Table = () => {
  const [data, setData] = useState<dataType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [editableRow, setEditableRow] = useState<dataType | null>(null);
  const perPage = 10;

  const fetchData = useCallback(() => {
    fetchTableData(currentPage, perPage)
      .then(data => {
        setData(data.results);
        setTotalPages(Math.ceil(data.count / perPage));
        setCurrentPage(currentPage);
      })
      .catch(error => console.error('Error during get table data: ', error))
      .finally(() => {
        setActivePage(currentPage);
      });
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const saveRowChanges = (rowData: dataType) => {
    saveTableData(rowData)
      .then(() => {
        setEditableRow(null);

        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteRow = (id: number) => {
    deleteTableData(id).then();

    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <div className="h-screen flex justify-center mx-auto">
      <div className="mx-auto p-4 bg-teal-50">
        {data.length > 0 && activePage > -1 && (
          <>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className={tableStyles}>NAME</th>
                  <th className={tableStyles}>MAIL</th>
                  <th className={tableStyles}>BIRTH DATE</th>
                  <th className={tableStyles}>PHONE NUMBER</th>
                  <th className={tableStyles}>ADDRESS</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: dataType) => (
                  <tr key={item.id}>
                    {item.id === editableRow?.id ? (
                      <>
                        <td className={tableStyles}><input type="text" value={editableRow?.name} onChange={(e) => setEditableRow({ ...editableRow, name: e.target.value })} /></td>
                        <td className={tableStyles}><input type="text" value={editableRow?.email} onChange={(e) => setEditableRow({ ...editableRow, email: e.target.value })} /></td>
                        <td className={tableStyles}><input type="date" value={editableRow?.birthday_date} onChange={(e) => setEditableRow({ ...editableRow, birthday_date: e.target.value })} /></td>
                        <td className={tableStyles}><input type="text" value={editableRow?.phone_number} onChange={(e) => setEditableRow({ ...editableRow, phone_number: e.target.value })} /></td>
                        <td className={tableStyles}><input type="text" value={editableRow?.address} onChange={(e) => setEditableRow({ ...editableRow, address: e.target.value })} /></td>
                        <td className={tableStyles}><button onClick={() => saveRowChanges(editableRow)}>Save</button></td>
                      </>
                    ) : (
                      <>
                        <td className={tableStyles}>{item.name}</td>
                        <td className={tableStyles}>{item.email}</td>
                        <td className={tableStyles}>{item.birthday_date}</td>
                        <td className={tableStyles}>{item.phone_number}</td>
                        <td className={tableStyles}>{item.address}</td>
                        <td className={tableStyles}>
                          <button onClick={() => setEditableRow(item)}>Edit</button>
                        </td>
                        <td className={tableStyles}>
                          <button onClick={() => deleteRow(item.id)}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              onPageChange={handlePageChange}
              containerClassName={'pagination flex justify-center space-x-2 mt-5'}
              pageClassName={'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'}
              previousClassName={'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'}
              nextClassName={'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'}
              breakClassName={'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'}
              activeClassName={'bg-cyan-200'}
              initialPage={currentPage}
            />
            {currentPage}
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Table);
