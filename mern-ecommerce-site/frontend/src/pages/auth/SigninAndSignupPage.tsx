import Loader from "@/components/loader";
import useAuthStore from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";
import { Alert, Button, Input } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";

const SigninAndSignupPage = () => {
  const { signup, signin } = useAuthStore();

  const [isSignup, setIsSignup] = useState(false);
  useEffect(() => {
    if (window.location.pathname.includes("/signup")) {
      setIsSignup(true);
    } else {
      setIsSignup(false);
    }
  }, [window.location]);

  const signinAndSignup = useMutation({
    mutationKey: ["signinAndSignup"],
    mutationFn: async () => {
      let result;
      if (isSignup) {
        result = signup(formValue);
      } else {
        const { confirmPassword, name, ...other } = formValue;
        result = signin(other);
      }
      return result;
    },
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error.message);
    },
  });
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signinAndSignup.mutate();
  };
  // console.log(signinAndSignup.data);
  console.log(signinAndSignup);

  if (signinAndSignup.isPending) return <Loader />;
  return (
    <div className="bg-white rounded-lg p-4 max-w-[600px] mx-auto">
      <form
        action=""
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        {signinAndSignup.isError && (
          <Alert
            message={
              signinAndSignup.error?.response?.data?.message as unknown as any
            }
            type="error"
          />
        )}
        {isSignup && (
          <Input
            required
            name="name"
            value={formValue?.name || ""}
            onChange={handleInputChange}
            placeholder="Name"
          />
        )}
        <Input
          required
          name="email"
          value={formValue?.email || ""}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <Input
          required
          name="password"
          type="password"
          value={formValue?.password || ""}
          onChange={handleInputChange}
          placeholder="Password"
        />
        {isSignup && (
          <Input
            required
            name="confirmPassword"
            type="password"
            value={formValue?.confirmPassword || ""}
            onChange={handleInputChange}
            placeholder="Confirm Password"
          />
        )}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        {!isSignup ? (
          <Button type="link" href="signup">
            Sign up
          </Button>
        ) : (
          <Button type="link" href="signin">
            Sign in
          </Button>
        )}
      </form>
    </div>
  );
};

export default SigninAndSignupPage;
