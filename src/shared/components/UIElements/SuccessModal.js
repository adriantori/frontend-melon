import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const SuccessModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Login Info"
      show={!!props.success}
      footer={<Button onClick={props.onClear}>Masuk</Button>}
    >
      <p>Login Berhasil</p>
    </Modal>
  );
};

export default SuccessModal;
