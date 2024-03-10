import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from '@material-tailwind/react';

const UploadModal = ({ visible, header, onHide, handleUpload, hideUploadModal }) => {

  const uploadModalFooter = (
    <div className='flex gap-4 justify-end'>
      <Button type='button' color="blue" buttonSize="regular" onClick={handleUpload}>Upload</Button>
      <Button type='button' color="red" buttonSize="regular" onClick={hideUploadModal}>Cancel</Button>
    </div>
  );

  return (
    <Dialog visible={visible} onHide={onHide} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }} header={header} footer={uploadModalFooter} modal>
      <div className="confirmation-content">
        <i className="pi pi-upload mr-3" style={{ fontSize: '2rem' }} />
        <span>Choose a file to upload:</span>
        <input type="file" />
      </div>
    </Dialog>
  );
};

export default UploadModal;
