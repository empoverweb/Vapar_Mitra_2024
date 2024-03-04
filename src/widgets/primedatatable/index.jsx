import React, { useState, useEffect, useRef } from 'react'; 
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'; 
import { Toolbar } from 'primereact/toolbar'; 
import { InputText } from 'primereact/inputtext'; 
import { DocumentArrowDownIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function PrimeDataTable({tableHeading, tableColumns, tableData, handleAddNew, handleEdit, handleDelete, handleExport, showActions}) {
     
    const [globalFilter, setGlobalFilter] = useState(null); 
  
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                {handleAddNew && (
                    <button
                        className="flex select-none items-center gap-1 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={handleAddNew}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" strokeWidth="2" className="w-4 h-4">
                            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"/>
                        </svg>
                        Add User
                    </button>
                )}
                {handleExport && (
                    <button
                        className="flex select-none items-center gap-1 rounded-lg bg-green-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={handleExport}
                    >
                        <DocumentArrowDownIcon className='w-4 h-4' />
                        Export CSV
                    </button>
                )}
            </div>
        );
    };

    const rightToolbarTemplate = () => {
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
                {handleEdit && <PencilSquareIcon color='blue' className="w-5 h-5 cursor-pointer" onClick={() => handleEdit(rowData)} />}
                {handleDelete && <TrashIcon color='red' className="w-5 h-5 cursor-pointer" onClick={() => handleDelete(rowData)} />}
            </div>
        ) : null;
    };
    

    return (
        <div> 
            <div className="card"> 
                <h5 className="block font-sans bg-[#fafafa] p-4 pb-0 text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {tableHeading}
                </h5>
                <Toolbar className="mb-1" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> 
                <div className='p-4'>
                    <DataTable 
                        value={tableData}
                        resizableColumns 
                        showGridlines 
                        tableStyle={{ minWidth: '50rem' }} 
                        dataKey="id"  
                        paginator rows={10} 
                        rowsPerPageOptions={[5, 10, 25]} 
                        globalFilter={globalFilter}  
                    >
                        {tableColumns.map((column, index) => (
                            <Column key={index} field={column.field} header={column.header}></Column>
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
