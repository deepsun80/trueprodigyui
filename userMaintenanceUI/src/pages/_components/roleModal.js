import React from 'react';
import PropTypes from 'prop-types';
import { confirmable } from 'react-confirm';
import ReactModal from 'react-modal';

const modalStyle = {
  content: {
    padding: 20,
    top: '50%',
    left: '50%',
    bottom: '80px',
    width: '400px',
    height: '130px',
    transform: 'translate(-50%, -50%)'
  }
};

const ConfirmDialog = ({ confirmation, dismiss, proceed, show }) => {
  return (
    <ReactModal isOpen={show} style={modalStyle} onRequestClose={dismiss} >
      <span>Are you sure you want to remove this {confirmation}?</span>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '30px' }}>
        <button className='btn btn-default' style={{ marginRight: '20px' }} onClick={() => dismiss()} >No</button>
        <button className='btn btn-primary' onClick={() => proceed('same as cancel')}>Yes, delete {confirmation}</button>
      </div>
    </ReactModal>
  );
};

ConfirmDialog.propTypes = {
  cancel: PropTypes.func,          // from confirmable. call to close the dialog with promise rejected.
  confirmation: PropTypes.string,  // arguments of your confirm function
  dismiss: PropTypes.func,
  proceed: PropTypes.func,         // from confirmable. call to close the dialog with promise resolved.
  show: PropTypes.bool            // from confirmable. indicates if the dialog is shown or not.
};

// confirmable HOC pass props `show`, `dismiss`, `cancel` and `proceed` to your component.
export default confirmable(ConfirmDialog);
