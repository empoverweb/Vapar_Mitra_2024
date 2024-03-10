import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from '@material-tailwind/react';

export const ApproveModal = ({ visible, header, onHide, footer, handleApproval, hideApprovalDialog, userName }) => {

    const approvalDialogFooter = (
      <div className='flex gap-4 justify-end'>
        <Button type='button' variant="filled" size="md" className='bg-primaryColor' onClick={handleApproval}>Yes</Button>
        <Button type='button' variant="filled" size="md" className='bg-red-500' onClick={hideApprovalDialog}>No</Button>
      </div>
    );
  
    return (
      <Dialog visible={visible} header={header} footer={approvalDialogFooter} onHide={onHide} resizable={false} draggable={false}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <span>Are you sure you want to approve {userName}?</span>
        </div>
      </Dialog>
    );
  };
  