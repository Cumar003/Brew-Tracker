import type { Children } from '@/types/Types';

// This is a simple layout component for the admin panel
// It can be extended in the future to include a sidebar, header, etc.
const AdminLayout = ({ children }: Children) => {
  return <div>{children}</div>;
};

export default AdminLayout;
