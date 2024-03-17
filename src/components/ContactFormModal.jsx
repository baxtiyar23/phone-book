import React from 'react';
import { Modal, Form, Input } from 'antd';

const ContactFormModal = ({ visible, onCreate, onCancel, initialValues }) => {
  const [form] = Form.useForm();

  // Set initial form values when editing
  React.useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  return (
    <Modal
      visible={visible}
      title={initialValues ? 'Edit Contact' : 'Add Contact'}
      okText={initialValues ? 'Save' : 'Add'}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((errorInfo) => {
            console.error('Failed:', errorInfo);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please enter the name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="number"
          label="Number"
          rules={[
            {
              required: true,
              message: 'Please enter the number!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ContactFormModal;