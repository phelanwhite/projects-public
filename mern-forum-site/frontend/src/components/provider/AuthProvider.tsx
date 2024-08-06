import { useAuthStore } from "@/store/auth-store";
import { Navigate, Outlet } from "react-router-dom";

const AuthProvider = () => {
  const { isLoggedIn } = useAuthStore();
  return <div>{isLoggedIn ? <Outlet /> : <Navigate to={`/signin`} />}</div>;
};

export default AuthProvider;
