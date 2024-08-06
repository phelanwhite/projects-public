import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import {
  GithubOutlined,
  GoogleOutlined,
  LockOutlined,
  MailOutlined,
  TwitterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useMessageContext } from "@/contexts/MessageContext";

const SigninAndSignupPage = () => {
  const { signin, signup } = useAuthStore();
  const { messageApi } = useMessageContext();

  const signinAndSignupResult = useMutation({
    mutationFn: async () => {
      let result;

      if (isSignup) {
        result = await signup(formValue);
      } else {
        const { confirmPassword, username, ...other } = formValue;
        result = await signin(other);
      }
      return result;
    },

    onSuccess(data) {
      messageApi.open({
        type: "success",
        content: data?.message,
      });
      setTimeout(() => {
        if (!isSignup) {
          window.location.replace(`/`);
        }
      }, 1000);
    },
    onError(error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

  const [isSignup, setIsSignup] = useState(false);
  useEffect(() => {
    if (window.location.pathname.includes("signin")) {
      setIsSignup(false);
    }
    if (window.location.pathname.includes("signup")) {
      setIsSignup(true);
    }
  }, []);

  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    signinAndSignupResult.mutate();
  };

  return (
    <div>
      <div className="max-w-[700px] w-full mx-auto shadow rounded border p-4">
        {isSignup ? (
          <div className="font-semibold text-xl text-secondary mb-6">
            Signup
          </div>
        ) : (
          <div className="font-semibold text-xl text-secondary mb-6">
            Signin
          </div>
        )}
        <Form onSubmitCapture={handleSubmit} layout="vertical">
          {isSignup && (
            <Form.Item>
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                required
                name="username"
                value={formValue.username}
                onChange={handleInputChange}
              />
            </Form.Item>
          )}
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              type="email"
              required
              name="email"
              value={formValue.email}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              placeholder="Password"
              required
              name="password"
              value={formValue.password}
              onChange={handleInputChange}
            />
          </Form.Item>
          {isSignup && (
            <Form.Item>
              <Input
                prefix={<LockOutlined />}
                placeholder="Confirm password"
                required
                name="confirmPassword"
                value={formValue.confirmPassword}
                onChange={handleInputChange}
              />
            </Form.Item>
          )}
          <Form.Item>
            <Button
              loading={signinAndSignupResult.isPending}
              block
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="flex items-center gap-4 mb-4">
          <hr className="flex-1" />
          <span>or</span>
          <hr className="flex-1" />
        </div>
        <div className="grid gap-4 grid-cols-3 mb-4">
          <Button type="primary" htmlType="button">
            <GoogleOutlined />
          </Button>
          <Button type="primary" htmlType="button">
            <GithubOutlined />
          </Button>
          <Button type="primary" htmlType="button">
            <TwitterOutlined />
          </Button>
        </div>
        <div className="text-center ">
          {isSignup ? (
            <Button size="small" type="link" href={`/signin`}>
              Signin
            </Button>
          ) : (
            <Button size="small" type="link" href={`/signup`}>
              Signup
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SigninAndSignupPage;
