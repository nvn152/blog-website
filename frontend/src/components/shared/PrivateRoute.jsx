import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const {
    currentUser,
    isLoggedIn,
    error: serverError,
    loading,
  } = useSelector((state) => state.user);

  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/sign-in" />;
}

export default PrivateRoute;
