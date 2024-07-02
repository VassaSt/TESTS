import React, { useState } from 'react';
import { Button, Flex, Form, Input, InputNumber, ColorPicker } from "antd";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const onChange = (value) => {
  console.log("changed", value);
};


const App = () => (
  <Form
    name="basic"
    labelCol={{
      span: 7,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: "100%",
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Start Point"
      name="startPoint"
      rules={[
        {
          required: true,
          message: "Please input your username!",
        },
      ]}
    >
      <Input
        style={{
          width: 200,
        }}
      />
    </Form.Item>

    <Form.Item
      label="End Point"
      name="endPoint"
      rules={[
        {
          required: true,
          message: "Please input your password!",
        },
      ]}
    >
      <Input
        style={{
          width: 200,
        }}
      />
    </Form.Item>

    <Form.Item
      label="Color"
      name="color"
      rules={[
        {
          required: false,
        },
      ]}
    >
      <ColorPicker
        style={{
          width: 200,
          justifyContent:"flex-start"
        }}
        defaultValue="#1677ff"
        showText={(color) => <span> {color.toHexString()}</span>}
      />
    </Form.Item>

    <Form.Item label="Height" name="height">
      <InputNumber
        style={{
          width: 200,
        }}
        defaultValue="1"
        min="0"
        max="10"
        step="1"
        onChange={onChange}
        stringMode
      />
    </Form.Item>

    <Form.Item label="Width" name="width">
      <InputNumber
        style={{
          width: 200,
        }}
        defaultValue="1"
        min="0"
        max="10"
        step="1"
        onChange={onChange}
        stringMode
      />
    </Form.Item>

    <Flex
      wrap="wrap"
      gap="small"
      style={{
        width: "100%",
      }}
    >
      <Button
        style={{
          width: "48%",
        }}
        htmlType="submit"
      >
        Delete
      </Button>
      <Button
        style={{
          width: "48%",
        }}
        type="primary"
        htmlType="submit"
      >
        New Path
      </Button>
      <Button
        style={{
          width: "100%",
        }}
        htmlType="submit"
      >
        Export
      </Button>
    </Flex>
  </Form>
);
export default App;
