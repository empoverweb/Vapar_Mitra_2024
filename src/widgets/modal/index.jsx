import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';

const Modal = ({ visible, header,onHide, footer, children }) => {
 
    return (
        <Dialog visible={visible} header={header} footer={footer} onHide={onHide}>
           <div>{children}</div>
        </Dialog>
    );
};

export default Modal;