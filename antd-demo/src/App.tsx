import { Button, Checkbox, Form, Input, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "./assets/images/🦆 illustration _store location shop_.png";

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

function App() {
  const onFinish = (values: FieldType) => {
    console.log("success", values);
  };

  const onFinishFailed = (errorInfo: object) => {
    console.log("failed", errorInfo);
  };

  const loginFormStyle = {
    form: { width: "50%", padding: "0 100px" },
    logo: { width: "40px" },
    formTitle: { fontWeight: 700 },
    submitButton: { background: "#438ef7" },
    signupLink: { fontWeight: 500, color: "#353535" },
  };

  return (
    <Form
      name="login"
      labelCol={{ span: 8 }}
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={loginFormStyle.form}
    >
      <img src={logo} alt="logo" style={loginFormStyle.logo} />

      <Typography.Title style={loginFormStyle.formTitle}>
        {" "}
        Sign in{" "}
      </Typography.Title>

      <Typography.Paragraph>Some bla bla bla text</Typography.Paragraph>

      <Typography.Text strong>Username</Typography.Text>

      <Form.Item<FieldType>
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>

      <Typography.Text strong>Password</Typography.Text>

      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 0, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          style={loginFormStyle.submitButton}
        >
          Login
        </Button>
      </Form.Item>

      <Form.Item style={{ textAlign: "center" }}>
        <Typography.Text style={loginFormStyle.signupLink}>
          Don't have an account? <Typography.Link>Sign up now</Typography.Link>
        </Typography.Text>
      </Form.Item>
    </Form>
  );
}

export default App;
