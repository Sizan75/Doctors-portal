import React from 'react';

const ConfirmationModal = ({title,message,closeModal,modalData, successAction, successButton}) => {
    return (
        <div>
<input type="checkbox" id="confirmation-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
  <label onClick={closeModal} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="text-lg font-bold">{title}</h3>
    <p className="py-4">{message}</p>
    <label htmlFor="confirmation-modal" onClick={()=> successAction(modalData)} className="btn btn-primary ">{successButton}</label>
  </div>
</div>
        </div>
    );
};

export default ConfirmationModal;