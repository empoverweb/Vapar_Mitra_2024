import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { DocumentArrowDownIcon, PencilSquareIcon, TrashIcon, CloudArrowDownIcon, CloudArrowUpIcon } from '@heroicons/react/24/solid';
import { Tag } from 'primereact/tag';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export default function PrimeDataTable({ tableHeading, tableColumns, tableData, handleAddNew, handleEdit, handleDelete, handleExport, showActions, handleDownload, handleUpload, buttonName, handleApproveButton }) {
    
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);

    const getStatus = (rowData) => {
        return rowData.status ? 'success' : 'danger';
    };

    const getStatusText = (status) => {
        return status ? 'Active' : 'Inactive';
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={getStatusText(rowData.status)} severity={getStatus(rowData)}></Tag>;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const rightToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                {handleDownload && (
                    <button
                        className="flex select-none items-center gap-1 rounded-lg bg-purple-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={handleDownload}
                    >
                        <CloudArrowDownIcon className='w-4 h-4' />
                        Download
                    </button>
                )}
                {handleUpload && (
                    <button
                        className="flex select-none items-center gap-1 rounded-lg bg-blue-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={handleUpload}
                    >
                        <CloudArrowUpIcon className='w-4 h-4' />
                        Upload
                    </button>
                )}
                {handleExport && (
                    <button
                        className="flex select-none items-center gap-1 rounded-lg bg-green-600 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={exportCSV}
                    >
                        <DocumentArrowDownIcon className='w-4 h-4' />
                        Export
                    </button>
                )}
                {handleAddNew && (
                    <button
                        className="flex select-none items-center gap-1 rounded-lg bg-secondaryColor py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={handleAddNew}
                    >
                        <PlusCircleIcon className='w-6 h-6' />
                        {tableHeading}
                    </button>
                )}

            </div>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return showActions ? (
            <div className='flex gap-2'>
                 {handleEdit && <PencilSquareIcon className="bg-yellow-800 text-white w-6 h-6 cursor-pointer rounded-lg p-1" onClick={() => handleEdit(rowData)} />}
                {handleDelete && <TrashIcon className="bg-red-600 w-6 h-6 text-white cursor-pointer rounded-lg p-1" onClick={() => handleDelete(rowData)} />}
            </div>
        ) : null;
    };


    return (
        <div>
            <div className='p-4'>
                <Toolbar className="mb-0 bg-white rounded-t-2xl" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <div>
                    <DataTable
                        value={tableData}
                        resizableColumns
                        showGridlines
                        dataKey="id"
                        ref={dt}
                        paginator rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                    >
                        <Column
                            key="sno"
                            header="Sno"
                            style={{ width: '3rem' }}
                            body={(rowData, rowIndex) => tableData.indexOf(rowData) + 1}
                        />
                        {tableColumns.map((column, index) => (
                            column.field === "status" ? (
                                <Column key={index} field={column.field} header={column.header} body={statusBodyTemplate}></Column>
                            ) : (
                                <Column key={index} field={column.field} header={column.header}></Column>
                            )
                        ))}
                        {showActions && (
                            <Column header="Action" body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem' }}></Column>
                        )}
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
