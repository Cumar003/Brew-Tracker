import { Outlet } from "react-router-dom";
import { AdminLayout } from "../layouts";

const AdminGuard = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminGuard;
