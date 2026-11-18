
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PermissionRoute = ({ permission, children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-medium text-[#3154A5]">
          Checking access permissions...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const hasPermission =
    user.role === "admin" ||
    user.permissions?.includes(permission);

  if (!hasPermission) {
    return <Navigate to="/profile" replace />;
  }

  return children || <Outlet />;
};

export default PermissionRoute;
