import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import banner from "../assets/banner-about.png";
import { Link } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../stores/authApi ";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../stores/authSlice";
const LoginAndRegister = () => {
  const disptach = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [login, loginResult] = useLoginMutation();
  const [register] = useRegisterMutation();

  useEffect(() => {
    if (window.location.pathname.includes("register")) {
      setIsSignup(true);
    } else {
      setIsSignup(false);
    }
  }, [window.location.pathname]);

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignup) {
      register(formValue);
    } else {
      const { name, ...other } = formValue;
      login(other);
    }
  };

  useEffect(() => {
    if (!isSignup && loginResult?.isSuccess) {
      disptach(setCurrentUser(loginResult?.data));
      window.location.replace(`/`);
    }
  }, [loginResult, isSignup, disptach]);

  return (
    <div
      className="pt-32 px-4 min-h-screen"
      style={{
        background: `url(${banner}) no-repeat center/cover`,
      }}
    >
      <div className="max-w-[600px] w-full mx-auto bg-white rounded-lg p-6">
        <form
          onSubmit={handleSubmit}
          action=""
          method="post"
          className="flex flex-col gap-4"
        >
          <div className="font-semibold text-xl">
            {isSignup ? "Signup" : "Signin"}
          </div>
          {isSignup && (
            <input
              placeholder="Name"
              name="name"
              value={formValue.name}
              onChange={handleChange}
              type="text"
              required
              className="input"
            />
          )}
          <input
            placeholder="Email"
            name="email"
            value={formValue.email}
            onChange={handleChange}
            type="email"
            required
            className="input"
          />
          <input
            placeholder="Password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            type="password"
            required
            className="input"
          />
          <button className="btn-primary">Submit</button>
          {isSignup ? (
            <Link
              to={`/login`}
              className="text-center text-blue-500 hover:underline text-sm"
            >
              Login
            </Link>
          ) : (
            <Link
              to={`/register`}
              className="text-center text-blue-500 hover:underline text-sm"
            >
              Register
            </Link>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginAndRegister;
