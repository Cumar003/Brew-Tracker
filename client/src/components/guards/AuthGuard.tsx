import { Outlet } from "react-router-dom"
import { AuthLayout } from "../layouts"

const AuthGuard = () => {
  return (
    <AuthLayout>
      <Outlet/>
    </AuthLayout>
  )
}

export default AuthGuard