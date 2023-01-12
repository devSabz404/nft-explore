import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import Invite from './forms/inviteform';
import '@ant-design/pro-components/dist/components.css';

const InviteModal = () => {
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
        Invite 
      </Button>
      <Modal title="Invite Users" visible={isModalVisible} onCancel={handleCancel}>
      <Invite/>
      </Modal>
    </>
  );
};

export default InviteModal;