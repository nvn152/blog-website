import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function AdminOnlyRoute() {
  const {
    currentUser,
    isLoggedIn,
    error: serverError,
    loading,
  } = useSelector((state) => state.user);

  return currentUser.isAdmin ? <Outlet /> : <Navigate to="/auth/sign-in" />;
}

export default AdminOnlyRoute;
