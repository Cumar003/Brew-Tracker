import type { Children } from "@/types/Types";

// This is a simple layout component for the user panel
// It can be extended in the future to include a sidebar, header, and other user related stuff.
const AuthLayout = ({ children }: Children) => {
  return <div>{children}</div>;
};

export default AuthLayout;
