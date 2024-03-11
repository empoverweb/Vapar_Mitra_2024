import React, { useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from '@material-tailwind/react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
export const UploadModal = ({ visible, header, onHide,upLoadUrl,extraParams}) => {

    const toast = useRef(null);  
  return (
    <Dialog visible={visible} header={header}  onHide={onHide} resizable={false} draggable={false}>
      <div className="confirmation-content">
      <Toast ref={toast}></Toast> 
      <FileUpload
        name={extraParams}
        multiple
        accept="image/*"
        maxFileSize={1000000}
        url={upLoadUrl}
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
      />
       </div>
    </Dialog>
  );
};