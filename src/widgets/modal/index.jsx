import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';

export const Modal = ({ visible, header,onHide, footer, children }) => {
 
    return (
        <Dialog visible={visible} header={header} footer={footer} onHide={onHide} resizable={false} draggable={false}>
           <div>{children}</div>
        </Dialog>
    );
};

export default Modal;