import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from '@material-tailwind/react';

export const DeleteModal = ({ visible, header, onHide, footer, handleDelete , hideDeleteProductsDialog}) => {

const deleteProductsDialogFooter = (
    <div className='flex gap-4 justify-end'>
         <Button type='button' variant="filled" size="md" className='bg-primaryColor' onClick={handleDelete}>Yes</Button>
         <Button type='button' variant="filled" size="md" className='bg-red-500' onClick={hideDeleteProductsDialog}>No</Button>
 
    </div>
    );


  return (
    <Dialog visible={visible} header={header} footer={deleteProductsDialogFooter} onHide={onHide} resizable={false} draggable={false}>
      <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
           <span>Are you sure you want to delete the selected item?</span>
        </div>
    </Dialog>
  );
};