import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import FormInvite from './form';

const ModalInvite = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button style={{backgroundColor:"#660099",color:"#FFF"}} onClick={showModal}>
        Invite Creator
      </Button>
      <Modal title="Invite Creator" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <FormInvite/>
      </Modal>
    </>
  );
};

export default ModalInvite;