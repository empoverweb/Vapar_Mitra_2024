import React from 'react';
import { Dialog } from 'primereact/dialog';

const Modal = ({ visible, header, footer, onHide, children }) => {
    return (
        <Dialog visible={visible} onHide={onHide} header={header} footer={footer}>
            {children}
        </Dialog>
    );
};

export default Modal;