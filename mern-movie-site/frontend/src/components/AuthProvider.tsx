import { memo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthProvider = () => {
  const user = useSelector((state: any) => state?.authSlice?.currentUser);

  return <div>{user ? <Outlet /> : <Navigate to={`/login`} />}</div>;
};

export default memo(AuthProvider);
