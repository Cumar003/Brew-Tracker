import { Outlet } from "react-router-dom";
import { AuthLayout } from "../layouts";

const RootGuard = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default RootGuard;
